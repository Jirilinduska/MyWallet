const express = require("express")
const { markAsRead } = require("./controller")
const { authenticateToken } = require("../../../middleware/authenticateToken")

const router = express.Router()

const baseIrl = "/api/notifications/mark-as-read/:id"

router.post(baseIrl, authenticateToken, markAsRead)

module.exports = router