const User = require("../../../models/User")


const getUserData = async(req,res) => {

    const userID = req.userID

    try {
        
        const user = await User.findOne(userID)

        if(!user) return res.status(400).json({ message: "User not found." })

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
        return res.status(500).json({ message: "Server error." })
    }

}


module.exports = { getUserData }