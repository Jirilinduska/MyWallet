const express = require("express")
const { updateCategory } = require("./controller")
const { authenticateToken } = require("../../../middleware/authenticateToken")

const router = express.Router()

const baseIrl = "/api/category/update-category"

router.patch(baseIrl, authenticateToken, updateCategory)

module.exports = router