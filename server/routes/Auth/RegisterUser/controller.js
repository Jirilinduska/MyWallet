const bcrypt = require('bcryptjs')
const User = require("../../../models/User")
const { sendEmailAfterRegistration } = require('../../../modules/Emails/Emails')
const { generateToken } = require('../../../libs/jwtUtils')
const { createDefaultCategories } = require('../../../modules/Categories/Categories')

const registerUser = async(req,res) => {

    const { userName, email, password } = req.body

    try {

        if(!userName) return res.status(400).json({ errCode: 1008 })
        if(!email)    return res.status(400).json({ errCode: 1007 })
        if(!password) return res.status(400).json({ errCode: 1003 })
                
        const isAlreadyIn = await User.findOne({ email })

        if(isAlreadyIn) return res.status(400).json({ errCode: 1009 })

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({ userName, email, password: hashPassword })

        await newUser.save()

        const token = generateToken(newUser._id, newUser.email)

        await sendEmailAfterRegistration(email, token)
        await createDefaultCategories(newUser._id)

        return res.status(200).json({ token })

    } catch (error) {
        console.log("registerUser() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }
}

module.exports = { registerUser }