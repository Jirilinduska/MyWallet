const User = require("../../../models/User")
const bcrypt = require('bcryptjs')

const deleteAccount = async(req,res) => {

    const { password } = req.body
    const userID = req.user.userID

    try {

        if (!password) return res.status(400).json({ errCode: 1003 })
        
        const user = await User.findById(userID)

        if(!user) return res.status(200).json({ message: "User not found" })

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) return res.status(400).json({ errCode: 1001 })

        if(!user.settings.canBeDeleted) return res.status(400).json({ errCode: 1006 })

        await user.deleteOne()

        return res.status(200).json({ message: "Account deleted" })

    } catch (error) {
        console.log("deleteAccount() => : ", error)
        return res.status(500).json({ message: "Server error" })
    }

}

module.exports = { deleteAccount }