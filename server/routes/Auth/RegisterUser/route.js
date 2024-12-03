const express = require("express")
const { registerUser } = require("./controller")

const router = express.Router()

const baseIrl = "/api/auth/register"

router.post(baseIrl, registerUser
)

module.exports = router