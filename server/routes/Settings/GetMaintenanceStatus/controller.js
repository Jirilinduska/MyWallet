const Settings = require("../../../models/Settings")

const getMaintenanceStatus = async(req,res) => {

    try {
        const settings = await Settings.findOne()
        return res.status(200).json(settings.isMaintenance)
    } catch (error) {
        console.log("getMaintenanceStatus() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }

}


module.exports = { getMaintenanceStatus }