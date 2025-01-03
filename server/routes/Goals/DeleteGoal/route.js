const express = require("express")
const { deleteGoal } = require("./controller")
const { authenticateToken } = require("../../../middleware/authenticateToken")

const router = express.Router()

const baseIrl = "/api/goal/delete-goal/:id"

router.delete(baseIrl, authenticateToken, deleteGoal)

module.exports = router