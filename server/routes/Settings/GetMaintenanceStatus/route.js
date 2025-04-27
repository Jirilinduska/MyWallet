const express = require("express")
const { getMaintenanceStatus } = require("./controller")

const router = express.Router()

const baseIrl = "/api/admin/settings/maintenance"

router.get(baseIrl, getMaintenanceStatus)

module.exports = router