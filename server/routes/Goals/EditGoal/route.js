const express = require("express")
const { editGoal } = require("./controller")
const { authenticateToken } = require("../../../middleware/authenticateToken")

const router = express.Router()

const baseIrl = "/api/goal/edit-goal/:id"

router.patch(baseIrl, authenticateToken, editGoal)

module.exports = router