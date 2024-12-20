const User = require("../../../models/User")


const completeProfile = async(req,res) => {

    const { lang, curr, avatarID } = req.body
    const userID = req.user.userID

    try {
        
        const user = await User.findById(userID)

        if(!user) return res.status(400).json({ message: "User not found." })

        user.utils.currency = curr
        user.utils.language = lang
        user.utils.avatarID = avatarID
        user.settings.profileCompleted = true

        await user.save()

        return res.status(200).json({ message: "User data saved." })

    } catch (error) {
        console.log("completeProfile() => : ", error)
        return res.status(500).json({ message: "Server error." })
    }

}


module.exports = { completeProfile }