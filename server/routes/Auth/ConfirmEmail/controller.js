const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require("../../../models/User")
const { verifyToken } = require('../../../libs/jwtUtils')


const confirmEmail = async(req, res) => {

    const { token } = req.query
    // const JWT_SECRET = process.env.JWT_SECRET

    try {

        const decoded = verifyToken(token)
        const userID = decoded.userID

        const user = await User.findById(userID)

        if (!user) return res.status(404).json({ message: "User not found" })

        if (user.settings.emailConfirmed) return res.status(400).json({ message: "Email is already confirmed" });
        
        user.settings.emailConfirmed = true

        await user.save()

        return res.redirect(`${process.env.FRONTEND_URL}/email-confirmed`)

    } catch (error) {
        console.error("confirmEmail() => : ", error)
        // TODO return res.redirect(`${process.env.FRONTEND_URL}/error?message=Invalid or expired token`);
    }


}


module.exports = { confirmEmail }