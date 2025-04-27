const User = require("../../../models/User")
const Transaction = require("../../../models/Transaction")
const Settings = require("../../../models/Settings")
const mongoose = require("mongoose")

const MAX_STORAGE_MB = 512 // free tier mongoDB

const getAdminData = async(req,res) => {

    const userID = req.user.userID
    
    try {

        const user = await User.findById(userID)

        if(user.isAdmin === false) {
            return res.status(403).json({ errCode: 1013 })
        }

        const allUsersCount = (await User.find()).length

        const allUsersData = await User.find()
            .select("userName email lastOnline settings.profileCompleted settings.emailConfirmed settings.canBeDeleted isAdmin")

        const appSettings = await Settings.findOne()
        if(!appSettings) await Settings.create({})

        const dbStats = await mongoose.connection.db.stats()

        const storageUsedMB = (dbStats.storageSize / (1024 * 1024)).toFixed(2)
        const usagePercent = ((storageUsedMB / MAX_STORAGE_MB) * 100).toFixed(2)
 
        const adminData = {
            usersCount: allUsersCount,
            allUsersData,
            appSettings,
            dbData: {
                collections: dbStats.collections,
                objects: dbStats.objects,
                storage: `${storageUsedMB} / ${MAX_STORAGE_MB} MB (${usagePercent}%)`,
                storageUsedMB,
                MAX_STORAGE_MB,
                usagePercent,
            }
        }

        return res.status(200).json(adminData)
        
    } catch (error) {
        console.log("getAdminData() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }

}


module.exports = { getAdminData }