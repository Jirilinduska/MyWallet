const express = require("express")
const { deleteCategory } = require("./controller")
const { authenticateToken } = require("../../../middleware/authenticateToken")

const router = express.Router()

const baseIrl = "/api/category/delete-category/:id"

router.delete(baseIrl, authenticateToken, deleteCategory)

module.exports = router