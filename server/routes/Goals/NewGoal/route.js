const express = require("express")
const { newGoal } = require("./controller")
const { authenticateToken } = require("../../../middleware/authenticateToken")

const router = express.Router()

const baseIrl = "/api/goal/new-goal"

router.post(baseIrl, authenticateToken, newGoal)

module.exports = router