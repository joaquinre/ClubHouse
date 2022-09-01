const verifyOtp = require("../services/otp-service")
const hashServices = require("../services/hash-services")
const otpService = require("../services/otp-service")
const userService = require('../services/user-services')
const tokenService = require('../services/token')
const UserDto = require("./dtos/user-dto")

class AuthController {
    async sendOtp( req, res) {
        const { phone } = req.body
        if (!phone) {
            res.status(400).json({message: 'Phone field is required!'})
        }

        const otp = await otpService.generateOtp()

        // Hash
        const ttl = 1000 * 60 * 2 // 2 min
        const expires = Date.now() + ttl
        const data = `${phone}.${otp}.${expires}`
        const hash = hashServices.hashOtp(data)

        // send OTP
        try {
            // await otpService.sendBySms(phone, otp)
            res.json({
                hash: `${hash}.${expires}`,
                phone,
                otp
            })
        } catch (error) {
            console.log(error)        
            res.status(500).json({ message: 'message sending failed'})
        }
    
    }

    async verifyOtp(req, res) {
        const { otp, hash, phone } = req.body
        if (!otp || !hash || !phone) {
            res.status(400).json({message: 'All fields are required!'})
        }

        const [hashedOtp, expires] = hash.split('.')
        if (Date.now() > +expires) {
            res.status(400).json({ message: 'OTP expired!'})
        }

        const data = `${phone}.${otp}.${expires}`

        const isValid = otpService.verifyOtp(hashedOtp, data)
        if (!isValid) {
           res.status(400).json({ message: 'Invalid OTP' }) 
        }

        let user
        try {
            user = await userService.findUser({ phone })
            if (!user) {
                user = await userService.createUser({ phone })
                console.log(user);
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Db error' })
        }

        // Token
        const { accessToken, refreshToken }  = tokenService.generateTokens({
                _id: user._id,
                activated: false,
        })

        res.cookie('refreshtoken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        });
        const userDto = new UserDto(user)

        res.json({ accessToken, user: userDto })
    }
}

module.exports = new AuthController()