const express = require("express")
const { editCategoryAmount } = require("./controller")
const { authenticateToken } = require("../../../middleware/authenticateToken")

const router = express.Router()

const baseIrl = "/api/budget/edit-category"

router.post(baseIrl, authenticateToken, editCategoryAmount)

module.exports = router