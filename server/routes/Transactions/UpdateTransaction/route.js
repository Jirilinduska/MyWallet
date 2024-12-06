const express = require("express")
const { updateTransaction } = require("./controller")
const { authenticateToken } = require("../../../middleware/authenticateToken")

const router = express.Router()

const baseIrl = "/api/transaction/update"

router.patch(baseIrl, authenticateToken, updateTransaction)

module.exports = router