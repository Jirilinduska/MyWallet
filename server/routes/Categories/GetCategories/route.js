const express = require("express")
const { getCategories } = require("./controller")
const { authenticateToken } = require("../../../middleware/authenticateToken")

const router = express.Router()

const baseIrl = "/api/category/get-category/:categoryType"

router.get(baseIrl, authenticateToken, getCategories)

module.exports = router