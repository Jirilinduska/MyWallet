const Notifications = require("../../../models/Notification")


const deleteNotification = async(req,res) => {

    const { id } = req.params

    try {

        await Notifications.findByIdAndDelete(id)
        return res.status(200).json({ errCode: 5001 })

    } catch (error) {
        console.log("deleteNotification() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }

}

module.exports = { deleteNotification }