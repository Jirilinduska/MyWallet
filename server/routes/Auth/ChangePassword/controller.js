const User = require("../../../models/User")
const bcrypt = require('bcryptjs')

const changePassword = async(req,res) => {

    const { currentPassword, newPassword } = req.body
    const userID = req.user.userID

    try {
        const user = await User.findById(userID)

        // TODO - nemelo by nastat - přidat chybu + odshlasit na fe?
        if(!user) {
            return res.status(400).json({ message: "User not found" })
        }

        if(!currentPassword) {
            return res.status(400).json({ errCode: 1003 })
        }

        if(!newPassword) {
            return res.status(400).json({ errCode: 1004 })
        }

        if(currentPassword === newPassword) {
            return res.status(400).json({ errCode: 1005 })
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password)

        if (!isMatch) {
            return res.status(400).json({ errCode: 1002 })
        }

        const hashPassword = await bcrypt.hash(newPassword, 10)

        user.password = hashPassword

        await user.save()

        return res.status(200).json({ message: "Password has been successfully updated" })

    } catch (error) {
        console.log("changePassword() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }
}

module.exports = { changePassword }