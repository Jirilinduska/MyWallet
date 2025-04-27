const bcrypt = require('bcryptjs')
const User = require("../../../models/User")
const Settings = require("../../../models/Settings")
const { sendEmailAfterRegistration } = require('../../../modules/Emails/Emails')
const { generateToken } = require('../../../libs/jwtUtils')
const { createDefaultCategories } = require('../../../modules/Categories/Categories')
const { notifAfterRegister } = require('../../../modules/Notifications/notifAfterRegister')

const registerUser = async(req,res) => {

    const { userName, email, password } = req.body

    const now = new Date()
    let lastMonth = now.getMonth()
    let year = now.getFullYear()

    if (lastMonth === 0) {
        lastMonth = 12
        year = year - 1
    }

    try {

        if(!userName) return res.status(400).json({ errCode: 1008 })
        if(!email)    return res.status(400).json({ errCode: 1007 })
        if(!password) return res.status(400).json({ errCode: 1003 })
        if(password.length < 8) return res.status(400).json({ errCode: 1011 })
                
        const isAlreadyIn = await User.findOne({ email })

        if(isAlreadyIn) return res.status(400).json({ errCode: 1009 })

        const appSettings = await Settings.findOne()
        if(appSettings.allowRegistration === false) {
            return res.status(400).json({ errCode: 1014 })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({ 
            userName, 
            email, 
            password: hashPassword, 
            lastMonthSummaryNotif: { month: lastMonth, year },
            isAdmin: false
        })

        await newUser.save()

        const token = generateToken(newUser._id, newUser.email)

        await sendEmailAfterRegistration(email, token)
        await createDefaultCategories(newUser._id)
        await notifAfterRegister(newUser._id)

        return res.status(200).json({ token })

    } catch (error) {
        console.log("registerUser() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }
}

module.exports = { registerUser }