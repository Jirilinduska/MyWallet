const express = require("express")
const { updateBudget } = require("./controller")
const { authenticateToken } = require("../../../middleware/authenticateToken")

const router = express.Router()

const baseIrl = "/api/budget/update-budget"

router.post(baseIrl, authenticateToken, updateBudget)

module.exports = router