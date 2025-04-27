const User = require("../../../models/User")
const Transaction = require("../../../models/Transaction")
const Budget = require("../../../models/Budget")
const MonthlySummary = require("../../../models/MonthSummary")
const Notifs = require("../../../models/Notification")

const deleteUserByAdmin = async(req,res) => {

    const userID = req.user.userID
    const { userName } = req.params

    try {

        const user = await User.findById(userID)

        if(user.isAdmin === false) {
            return res.status(403).json({ errCode: 1013 })
        }

        const targetUser = await User.findOne({ userName: new RegExp(`^${userName}$`, "i") })

        if(targetUser.settings.canBeDeleted === false) {
            return res.status(400).json({ errCode: 1006 })
        }

        if (!targetUser) {
          return res.status(404).json({ errCode: 5000})
        }

        await Transaction.deleteMany({ createdBy: targetUser._id })
        await Budget.deleteMany({ createdBy: targetUser._id })
        await MonthlySummary.deleteMany({ createdBy: targetUser._id })
        await Notifs.deleteMany({ userID: targetUser._id })
    
        return res.sendStatus(200)
        
    } catch (error) {
        console.log("getAdminData() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }

}


module.exports = { deleteUserByAdmin }