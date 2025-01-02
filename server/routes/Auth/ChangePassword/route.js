const express = require("express")
const { changePassword } = require("./controller")
const { authenticateToken } = require("../../../middleware/authenticateToken")

const router = express.Router()

const baseIrl = "/api/auth/change-password"

router.post(baseIrl, authenticateToken, changePassword)

module.exports = router