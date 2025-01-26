const User = require("../../../models/User")
const Notification = require("../../../models/Notification")
const Category = require("../../../models/Category")
const Budget = require("../../../models/Budget")
const Goal = require("../../../models/Goal")
const Transaction = require("../../../models/Transaction")
const bcrypt = require('bcryptjs')

const deleteAccount = async(req,res) => {

    const { password } = req.body
    const userID = req.user.userID

    try {

        if (!password) return res.status(400).json({ errCode: 1003 })
        
        const user = await User.findById(userID)

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) return res.status(400).json({ errCode: 1001 })

        if(!user.settings.canBeDeleted) return res.status(400).json({ errCode: 1006 })


        await Notification.deleteMany({ userID: user._id })
        await Budget.deleteMany({ createdBy: user._id })
        await Category.deleteMany({ createdBy: user._id })
        await Goal.deleteMany({ createdBy: user._id })
        await Transaction.deleteMany({ createdBy: user._id })

        await user.deleteOne()

        return res.status(200).json({ errCode: 5001 })

    } catch (error) {
        console.log("deleteAccount() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }

}

module.exports = { deleteAccount }