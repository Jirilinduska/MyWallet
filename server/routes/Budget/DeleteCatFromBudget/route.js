const express = require("express")
const { deleteCatFromBudget } = require("./controller")
const { authenticateToken } = require("../../../middleware/authenticateToken")

const router = express.Router()

const baseIrl = "/api/budget/delete-category/:categoryID/:budgetID"

router.delete(baseIrl, authenticateToken, deleteCatFromBudget)

module.exports = router