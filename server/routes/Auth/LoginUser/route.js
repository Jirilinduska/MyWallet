const express = require("express")
const { loginUser } = require("./controller")

const router = express.Router()

const baseIrl = "/api/auth/login"

router.post(baseIrl, loginUser)

module.exports = router