const express = require("express")
const { completeProfile } = require("./controller")

const router = express.Router()

const baseIrl = "/api/user/complete-profile"

router.post(baseIrl, completeProfile)

module.exports = router