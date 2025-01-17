const express = require("express")
const { archiveNotification } = require("./controller")
const { authenticateToken } = require("../../../middleware/authenticateToken")

const router = express.Router()

const baseIrl = "/api/notifications/archive/:notifID/:id"

router.post(baseIrl, authenticateToken, archiveNotification)

module.exports = router