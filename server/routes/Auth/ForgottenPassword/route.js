const express = require("express")
const { forgottenPassword } = require("./controller")

const router = express.Router()

const baseIrl = "/api/auth/forgotten-password"

router.post(baseIrl, forgottenPassword)

module.exports = router