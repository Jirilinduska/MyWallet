const express = require("express")
const { getAdminData } = require("./controller")
const { authenticateToken } = require("../../../middleware/authenticateToken")

const router = express.Router()

const baseIrl = "/api/admin"

router.get(baseIrl, authenticateToken, getAdminData)

module.exports = router