const express = require("express")
const { getGoals } = require("./controller")
const { authenticateToken } = require("../../../middleware/authenticateToken")

const router = express.Router()

const baseIrl = "/api/goal/get-goals"

router.get(baseIrl, authenticateToken, getGoals)

module.exports = router