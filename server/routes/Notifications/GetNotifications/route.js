const express = require("express")
const { getNotifications } = require("./controller")
const { authenticateToken } = require("../../../middleware/authenticateToken")

const router = express.Router()

const baseIrl = "/api/notifications"

router.get(baseIrl, authenticateToken, getNotifications)

module.exports = router