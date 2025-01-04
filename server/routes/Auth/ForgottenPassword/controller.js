const User = require("../../../models/User")
const crypto = require("crypto")
const { sendEmailForgottenPassword } = require("../../../modules/Emails/Emails")

const forgottenPassword = async(req,res) => {

    const { email } = req.body

    try {
        
        const user = await User.findOne({ email })

        if(!user) return res.status(404).json({ message: "User not found" })


        const token = crypto.randomBytes(32).toString("hex")

        user.settings.resetPasswordToken = token
        user.settings.resetPasswordExpires = Date.now() + 600000 // 10 minut

        await user.save()

        await sendEmailForgottenPassword(email, token)

        return res.status(200).json({ message: "Password reset email sent" })

    } catch (error) {
        console.log("forgottenPassword() => : ", error)
        return res.status(500).json({ message: "Server error" })
    }

}

module.exports = { forgottenPassword }