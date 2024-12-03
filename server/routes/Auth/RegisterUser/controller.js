const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require("../../../models/User")

const JWT_SECRET = process.env.JWT_SECRET


const registerUser = async(req,res) => {

    const { userName, email, password } = req.body

    try {
        
        if(!userName || !email || !password) return res.status(400).json({ message: "Missing credentials" })
        
        const isAlreadyIn = await User.findOne({ email })

        if(isAlreadyIn) return res.status(400).json({ message: "User with this email already exists." })

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({ userName, email, password: hashPassword })

        await newUser.save()

        const token = jwt.sign(
            { userID: newUser._id, email: newUser.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        )

        return res.status(201).json({ token })

    } catch (error) {
        console.log("registerUser() => : ", error)
        return res.status(500).json({ message: "Server error" })
    }
}

module.exports = { registerUser }