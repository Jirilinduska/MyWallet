const express = require("express")
const { deleteAccount } = require("./controller")
const { authenticateToken } = require("../../../middleware/authenticateToken")

const router = express.Router()

const baseIrl = "/api/auth/delete-account"

router.post(baseIrl, authenticateToken, deleteAccount)

module.exports = router