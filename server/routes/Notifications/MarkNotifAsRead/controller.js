const Notifications = require("../../../models/Notification")


const markAsRead = async(req,res) => {

    const { id } = req.params

    try {

        const findNotif = await Notifications.findById(id)

        findNotif.isRead = true

        await findNotif.save()

        return res.status(200).json({ errCode: 5001 })

    } catch (error) {
        console.log("markAsRead() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }

}

module.exports = { markAsRead }