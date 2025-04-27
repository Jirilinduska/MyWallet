const express = require("express")
const { updateSettings } = require("./controller")
const { authenticateToken } = require("../../../middleware/authenticateToken")

const router = express.Router()

const baseIrl = "/api/admin/settings"

router.post(baseIrl, authenticateToken, updateSettings)

module.exports = router