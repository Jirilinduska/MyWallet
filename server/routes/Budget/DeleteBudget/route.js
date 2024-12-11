const express = require("express")
const { deleteBudget } = require("./controller")
const { authenticateToken } = require("../../../middleware/authenticateToken")

const router = express.Router()

const baseIrl = "/api/budget/delete-budget/:id"

router.delete(baseIrl, authenticateToken, deleteBudget)

module.exports = router