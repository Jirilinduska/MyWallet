const express = require("express")
const { newBudget } = require("./controller")
const { authenticateToken } = require("../../../middleware/authenticateToken")

const router = express.Router()

const baseIrl = "/api/budget/new-budget"

router.post(baseIrl, authenticateToken, newBudget)

module.exports = router