const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require("../../../models/User")

const JWT_SECRET = process.env.JWT_SECRET


const loginUser = async(req,res) => {

    const { email, password } = req.body

    try {
        
        if(!email || !password) return res.status(400).json({ message: "Missing credentials" })
        
        const findUser = await User.findOne({ email })

        if(!findUser) return res.status(400).json({ message: "Invalid credentials" })

        const isMatch = await bcrypt.compare(password, findUser.password)

        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
        

        const token = jwt.sign(
            { userID: findUser._id, email: findUser.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        )

        return res.status(201).json({ token })

    } catch (error) {
        console.log("loginUser() => : ", error)
        return res.status(500).json({ message: "Server error" })
    }
}

module.exports = { loginUser }