const express = require("express")
const { getOverview } = require("./controller")
const { authenticateToken } = require("../../../middleware/authenticateToken")

const router = express.Router()

const baseIrl = "/api/overview/get-overview/:year/:month"

router.get(baseIrl, authenticateToken, getOverview)

module.exports = router