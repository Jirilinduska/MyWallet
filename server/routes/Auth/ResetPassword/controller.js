const bcrypt = require("bcryptjs")
const User = require("../../../models/User")

const resetPassword = async(req,res) => {

    const { token, newPassword } = req.body

    try {

        const user = await User.findOne({
            "settings.resetPasswordToken": token,
            "settings.resetPasswordExpires": { $gt: Date.now() },
        })

        if (!user) return res.status(400).json({ errCode: 1012 })

        const hashPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashPassword

        user.resetPasswordToken = null
        user.resetPasswordExpires = null

        await user.save()

        return res.status(200).json({ errCode: 5001 })
          
    } catch (error) {
        console.log("resetPassword() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }
}

module.exports = { resetPassword }