const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET

// TODO - přidat + otestovat
// const TOKEN_DURATION = process.env.JWT_TOKEN_DURATION

const generateToken = (userID, email) => {
    return jwt.sign(
        { userID, email}, 
        JWT_SECRET, 
        { expiresIn: '1h' 
    })
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        console.error("Invalid token:", error)
        throw new Error("Token verification failed")
    }
}

module.exports = {
    generateToken,
    verifyToken
}