const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require("../../../models/User")
const { verifyToken } = require('../../../libs/jwtUtils')


const confirmEmail = async(req, res) => {

    const { token } = req.query

    try {

        const decoded = verifyToken(token)
        const userID = decoded.userID

        const user = await User.findById(userID)

        if (user.settings.emailConfirmed) {
            return res.redirect(`${process.env.FRONTEND_URL}/email-confirmed?confirmed=true`)
        }
        
        user.settings.emailConfirmed = true

        await user.save()

        return res.redirect(`${process.env.FRONTEND_URL}/email-confirmed?confirmed=true`)

    } catch (error) {
        console.error("confirmEmail() => : ", error)
        return res.redirect(`${process.env.FRONTEND_URL}/email-confirmed?confirmed=false`)
    }


}


module.exports = { confirmEmail }