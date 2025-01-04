const express = require("express")
const { confirmEmail } = require("./controller")

const router = express.Router()

const baseIrl = "/api/email/confirm-email"

router.get(baseIrl, confirmEmail)

module.exports = router