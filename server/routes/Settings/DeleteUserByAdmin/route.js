const express = require("express")
const { deleteUserByAdmin } = require("./controller")
const { authenticateToken } = require("../../../middleware/authenticateToken")

const router = express.Router()

const baseIrl = "/api/admin/delete-user/:userName"

router.delete(baseIrl, authenticateToken, deleteUserByAdmin)

module.exports = router