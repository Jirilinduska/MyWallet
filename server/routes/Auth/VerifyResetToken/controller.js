const User = require("../../../models/User")

const verifyResetToken = async(req,res) => {

    const { token } = req.params

    try {
        const user = await User.findOne({
            "settings.resetPasswordToken": token,
            "settings.resetPasswordExpires": { $gt: Date.now() },
        })

        // TODO - pokud je token už neplatný, přesmerovat opět a ukazat error!
        if (!user) return res.status(400).json({ message: "Invalid or expired token" })

        // TODO - Přidat na frontEnd, ale pouze pokud chci resetovat heslo, jinak forbidden pristup!
        return res.redirect(`${process.env.FRONTEND_URL}/reset-password/${token}`)

    } catch (error) {
        console.log("verifyResetToken() => : ", error)
        return res.status(500).json({ message: "Server error" })
    }
}


module.exports = { verifyResetToken }