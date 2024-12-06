const express = require("express")
const { getUserData } = require("./controller")
const { authenticateToken } = require("../../../middleware/authenticateToken")

const router = express.Router()

const baseIrl = "/api/user/get-user-data"

router.get(baseIrl, authenticateToken, getUserData)

module.exports = router