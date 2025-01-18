const User = require("../../../models/User")


const completeProfile = async(req,res) => {

    const { lang, curr, avatarID } = req.body
    const userID = req.user.userID

    try {
        
        const user = await User.findById(userID)

        user.utils.currency = curr
        user.utils.language = lang
        user.utils.avatarID = avatarID
        user.settings.profileCompleted = true

        await user.save()
        return res.status(200).json({ errCode: 5001 })

    } catch (error) {
        console.log("completeProfile() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }

}


module.exports = { completeProfile }