const express = require("express")
const { deleteTransaction } = require("./controller")
const { authenticateToken } = require("../../../middleware/authenticateToken")

const router = express.Router()

const baseIrl = "/api/transaction/delete/:id"

router.delete(baseIrl, authenticateToken, deleteTransaction)

module.exports = router