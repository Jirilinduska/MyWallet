const Notifications = require("../../../models/Notification")


const markAsRead = async(req,res) => {

    const { id } = req.params

    try {

        const findNotif = await Notifications.findById(id)

        // if (!findNotif) {
        //     return res.status(404).json({ errCode: 4040, message: "Notification not found" })
        // }

        findNotif.isRead = true

        await findNotif.save()

        return res.status(200).json({ success: true, message: "Notification marked as read" })


    } catch (error) {
        console.log("markAsRead() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }

}

module.exports = { markAsRead }