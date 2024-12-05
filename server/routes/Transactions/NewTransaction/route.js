const express = require("express")
const { newTransaction } = require("./controller")
const { authenticateToken } = require("../../../middleware/authenticateToken")

const router = express.Router()

const baseIrl = "/api/transaction/new-transaction"

router.post(baseIrl, authenticateToken, newTransaction)

module.exports = router