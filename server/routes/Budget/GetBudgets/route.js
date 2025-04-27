const express = require("express")
const { getBudgets } = require("./controller")
const { authenticateToken } = require("../../../middleware/authenticateToken")

const router = express.Router()

const baseIrl = "/api/budget"

router.get(baseIrl, authenticateToken, getBudgets)

module.exports = router