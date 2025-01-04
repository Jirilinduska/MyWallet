const express = require("express")
const { verifyResetToken } = require("./controller")

const router = express.Router()

const baseIrl = "/api/auth/verify-reset-token/:token"

router.get(baseIrl, verifyResetToken)

module.exports = router