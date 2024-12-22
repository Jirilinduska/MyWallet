const express = require("express")
const { getTransactionsByCategory } = require("./controller")
const { authenticateToken } = require("../../../middleware/authenticateToken")

const router = express.Router()

const baseIrl = "/api/transaction/get-transactions-by-category/:categoryID"

router.get(baseIrl, authenticateToken, getTransactionsByCategory)

module.exports = router