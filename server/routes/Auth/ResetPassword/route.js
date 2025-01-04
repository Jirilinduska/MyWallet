const express = require("express")
const { resetPassword } = require("./controller")

const router = express.Router()

const baseIrl = "/api/auth/reset-password"

router.post(baseIrl, resetPassword)

module.exports = router