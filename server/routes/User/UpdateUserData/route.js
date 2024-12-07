const express = require("express")
const { updateUserData } = require("./controller")
const { authenticateToken } = require("../../../middleware/authenticateToken")

const router = express.Router()

const baseIrl = "/api/user/update-user-data"

router.patch(baseIrl, authenticateToken, updateUserData)

module.exports = router