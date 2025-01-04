const bcrypt = require("bcryptjs")
const User = require("../../../models/User")

const resetPassword = async(req,res) => {

    const { token, newPassword } = req.body

    try {

        const user = await User.findOne({
            "settings.resetPasswordToken": token,
            "settings.resetPasswordExpires": { $gt: Date.now() },
        })

        // TODO 
        if (!user) return res.status(400).json({ message: "Invalid or expired token" })

        const hashPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashPassword

        user.resetPasswordToken = null
        user.resetPasswordExpires = null

        await user.save()

        return res.status(200).json({ message: "Password has been reset" })
          
    } catch (error) {
        console.log("resetPassword() => : ", error)
        return res.status(500).json({ message: "Server error" })
    }
}

module.exports = { resetPassword }