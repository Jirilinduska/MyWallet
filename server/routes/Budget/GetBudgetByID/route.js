const express = require("express")
const { getBudgetByID } = require("./controller")
const { authenticateToken } = require("../../../middleware/authenticateToken")

const router = express.Router()

const baseIrl = "/api/budget/:budgetID"

router.get(baseIrl, authenticateToken, getBudgetByID)

module.exports = router