const User = require("../../../models/User")
const Settings = require("../../../models/Settings")

const updateSettings = async(req,res) => {

    const userID = req.user.userID
    const settings = req.body

    try {

        const user = await User.findById(userID)

        if(user.isAdmin === false) {
            return res.status(403).json({ errCode: 1013 })
        }

        await Settings.findOneAndUpdate(
            {},  
            { $set: settings },     
            { upsert: true, new: true } 
        )

        return res.sendStatus(200)
        
    } catch (error) {
        console.log("updateSettings() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }

}


module.exports = { updateSettings }