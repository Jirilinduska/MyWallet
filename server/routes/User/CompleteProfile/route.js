const express = require("express")
const { completeProfile } = require("./controller")
const { authenticateToken } = require("../../../middleware/authenticateToken")

const router = express.Router()

const baseIrl = "/api/user/complete-profile"

router.post(baseIrl, authenticateToken, completeProfile)

module.exports = router