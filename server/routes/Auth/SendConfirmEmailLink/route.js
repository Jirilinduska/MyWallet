const express = require("express")
const { sendConfirmEmailLink } = require("./controller")
const { authenticateToken } = require("../../../middleware/authenticateToken")

const router = express.Router()

const baseIrl = "/api/auth/send-confirm-email-link"

router.post(baseIrl, authenticateToken, sendConfirmEmailLink)

module.exports = router