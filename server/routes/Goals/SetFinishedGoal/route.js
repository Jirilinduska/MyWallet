const express = require("express")
const { setFinishedGoal } = require("./controller")
const { authenticateToken } = require("../../../middleware/authenticateToken")

const router = express.Router()

const baseIrl = "/api/goal/set-finished/:id"

router.post(baseIrl, authenticateToken, setFinishedGoal)

module.exports = router