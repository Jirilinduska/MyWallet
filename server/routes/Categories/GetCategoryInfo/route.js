const express = require("express")
const { getCategoryInfo } = require("./controller")
const { authenticateToken } = require("../../../middleware/authenticateToken")

const router = express.Router()

const baseIrl = "/api/category/get-category-info/:id"

router.get(baseIrl, authenticateToken, getCategoryInfo)

module.exports = router