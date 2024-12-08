const express = require("express")
const { newCategory } = require("./controller")
const { authenticateToken } = require("../../../middleware/authenticateToken")

const router = express.Router()

const baseIrl = "/api/category/new-category"

router.post(baseIrl, authenticateToken, newCategory)

module.exports = router