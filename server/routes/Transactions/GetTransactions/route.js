const express = require("express")
const { getTransaction } = require("./controller")
const { authenticateToken } = require("../../../middleware/authenticateToken")

const router = express.Router()

const baseIrl = "/api/transaction/get-transaction/:month/:year"

router.get(baseIrl, authenticateToken, getTransaction)

module.exports = router