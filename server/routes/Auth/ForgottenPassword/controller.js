const User = require("../../../models/User")
const crypto = require("crypto")
const { sendEmailForgottenPassword } = require("../../../modules/Emails/Emails")

const forgottenPassword = async(req,res) => {

    const { email } = req.body

    try {
        
        const user = await User.findOne({ email })

        const token = crypto.randomBytes(32).toString("hex")

        user.settings.resetPasswordToken = token
        user.settings.resetPasswordExpires = Date.now() + 600000 // 10 minut

        await user.save()

        await sendEmailForgottenPassword(email, token)

        return res.status(200).json({ errCode: 5001 })

    } catch (error) {
        console.log("forgottenPassword() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }

}

module.exports = { forgottenPassword }