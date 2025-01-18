const User = require("../../../models/User")
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

        await user.deleteOne()

        return res.status(200).json({ errCode: 5001 })

    } catch (error) {
        console.log("deleteAccount() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }

}

module.exports = { deleteAccount }