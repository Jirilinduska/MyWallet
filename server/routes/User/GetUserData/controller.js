const User = require("../../../models/User")


const getUserData = async(req,res) => {

    const userID = req.user.userID

    try {
        
        const user = await User.findById(userID)

        if(!user) return res.status(400).json({ errCode: 1010 })

        const userData = {
            _id: user._id,
            userName: user.userName,
            email: user.email,
            utils: user.utils,
            settings: user.settings
        }

        return res.status(200).json(userData)

    } catch (error) {
        console.log("getUserData() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }

}


module.exports = { getUserData }