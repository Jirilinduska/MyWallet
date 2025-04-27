const express = require("express")
const { addCatToBudget } = require("./controller")
const { authenticateToken } = require("../../../middleware/authenticateToken")

const router = express.Router()

const baseIrl = "/api/budget/add-category"

router.post(baseIrl, authenticateToken, addCatToBudget)

module.exports = router