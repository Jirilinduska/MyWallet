const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require("../../../models/User")
const { generateToken } = require('../../../libs/jwtUtils')

const loginUser = async(req,res) => {

    const { email, password } = req.body

    try {
        
        if(!email || !password) return res.status(400).json({ message: "Missing credentials" })
        
        const findUser = await User.findOne({ email })

        // Špatný email
        if(!findUser) return res.status(400).json({ errCode: 1000 })

        const isMatch = await bcrypt.compare(password, findUser.password)

        // Špatné heslo
        if (!isMatch) return res.status(400).json({ errCode: 1001 })

        const token = generateToken(findUser._id, findUser.email)

        return res.status(201).json({ token })

    } catch (error) {
        console.log("loginUser() => : ", error)
        return res.status(500).json({ message: "Server error" })
    }
}

module.exports = { loginUser }