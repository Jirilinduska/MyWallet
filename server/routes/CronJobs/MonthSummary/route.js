const express = require("express")
const { monthSummary } = require("./controller")

const router = express.Router()

const baseIrl = "/api/cron-jobs/month-summary"

router.post(baseIrl, monthSummary)

module.exports = router