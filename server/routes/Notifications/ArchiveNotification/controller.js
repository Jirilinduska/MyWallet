const Notifications = require("../../../models/Notification")


const archiveNotification = async(req,res) => {

    const { notifID, id } = req.params

    try {

        const notif = await Notifications.findById(notifID)

        // Archive
        if(id === "1") {
            notif.isArchived = true
        }

        // UnArchive
        if(id === "0") {
            notif.isArchived = false
        }

        await notif.save()

        return res.status(200).json({ message: "Succed" })

    } catch (error) {
        console.log("archiveNotification() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }

}

module.exports = { archiveNotification }