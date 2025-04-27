const express = require("express")
const { getTransactionsPrevMonths } = require("./controller")
const { authenticateToken } = require("../../../middleware/authenticateToken")

const router = express.Router()

const baseIrl = "/api/transaction/get-transactions-prevmonths/:month/:year"

router.get(baseIrl, authenticateToken, getTransactionsPrevMonths)

module.exports = router