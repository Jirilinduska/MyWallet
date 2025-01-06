const User = require("../../../models/User")

const updateUserData = async(req,res) => {

    const { userName, email, currency, language, avatarID } = req.body
    const userID = req.user.userID

    try {

        const user = await User.findById(userID)

        if(!user) return res.status(400).json({ errCode: 1010 })

        user.userName = userName
        // user.email = email 
        user.utils.currency = currency
        user.utils.language = language
        user.utils.avatarID = avatarID

        await user.save() 
    
        return res.status(200).json({ errCode: 5001 })

    } catch (error) {
        console.log("updateUserData() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }

}


module.exports = { updateUserData }