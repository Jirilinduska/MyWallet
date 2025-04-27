const bcrypt = require('bcryptjs');
const User = require("../../../models/User");
const { generateToken } = require('../../../libs/jwtUtils');
const { notifMonthSummary } = require('../../../modules/Notifications/notifMonthSummary')

const loginUser = async (req, res) => {
    
    const { email, password } = req.body

    try {

        if (!email) return res.status(400).json({ errCode: 1007 })
        if (!password) return res.status(400).json({ errCode: 1003 })

        const findUser = await User.findOne({ email })

        if (!findUser) return res.status(400).json({ errCode: 1000 })

        const isMatch = await bcrypt.compare(password, findUser.password)

        if (!isMatch) return res.status(400).json({ errCode: 1001 })

        const token = generateToken(findUser._id, findUser.email)

        const now = new Date()

        const formattedDate = now.toLocaleString("cs-CZ", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        }).replace(",", "")

        findUser.lastOnline = formattedDate
        await findUser.save()

        await notifMonthSummary(findUser._id)

        return res.status(200).json({ token })
    } catch (error) {
        console.error("loginUser() => Error: ", error)
        return res.status(500).json({ errCode: 5000 })
    }
};

module.exports = { loginUser };
