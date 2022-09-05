const jwt = require('jsonwebtoken')
const refreshModel = require('../models/refresh-model')
const accesTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET
class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, accesTokenSecret, {
            expiresIn: '1h'
        })

        const refreshToken = jwt.sign(payload, refreshTokenSecret, {
            expiresIn: '1y'
        })
        return { accessToken, refreshToken}
    }

    async storeRefreshToken(token, userId) {
        try {
           await refreshModel.create({
                token,
                userId,
           }) 
        } catch (error) {
           console.log(error.message); 
        }
    }
}

module.exports = new TokenService()