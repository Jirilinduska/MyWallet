const express = require("express")
const { getTodayTransactions } = require("./controller")
const { authenticateToken } = require("../../../middleware/authenticateToken")

const router = express.Router()

const baseIrl = "/api/transaction/get-today-transactions"

router.get(baseIrl, authenticateToken, getTodayTransactions)

module.exports = router