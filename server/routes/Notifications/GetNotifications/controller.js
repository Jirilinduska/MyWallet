const User = require("../../../models/User")
const Notifications = require("../../../models/Notification")


const getNotifications = async(req,res) => {

    const userID = req.user.userID

    try {

        const user = await User.findById(userID)

        const notifs = await Notifications.find({
            userID: user._id
        }).sort({ createdAt: -1 })

        if(!notifs) return res.status(200).json([])
        
        return res.status(200).json(notifs)

    } catch (error) {
        console.log("getNotifications() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }

}

module.exports = { getNotifications }