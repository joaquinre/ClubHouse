const tokenServices = require("../services/token-services");

module.exports = async function (req, res, next) {
    try {
        const { accessToken } = req.cookies
        if (!accessToken) {
            throw new Error()
        }

        const userData = await tokenServices.verifyAccesToken(accessToken)
        if  (!userData)  {
            throw new Error()
        }
        req.user = userData
        next() 
    } catch (error) {
        res.status(401).json({ message: 'InvalidToken' })
    }
}