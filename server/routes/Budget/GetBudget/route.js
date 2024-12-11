const express = require("express")
const { getBudget } = require("./controller")
const { authenticateToken } = require("../../../middleware/authenticateToken")

const router = express.Router()

const baseIrl = "/api/budget/get-budget"

router.get(baseIrl, authenticateToken, getBudget)

module.exports = router