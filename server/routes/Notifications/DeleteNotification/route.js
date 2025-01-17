const express = require("express")
const { deleteNotification } = require("./controller")
const { authenticateToken } = require("../../../middleware/authenticateToken")

const router = express.Router()

const baseIrl = "/api/notifications/delete/:id"

router.delete(baseIrl, authenticateToken, deleteNotification)

module.exports = router