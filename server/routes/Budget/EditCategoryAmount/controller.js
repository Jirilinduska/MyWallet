const Budget = require("../../../models/Budget")

const editCategoryAmount = async(req,res) => {

    const { categoryID, budgetID, amount } = req.body

    const userID = req.user.userID

    try {
        const budget = await Budget.findById(budgetID)

        if(budget.createdBy.toString() !== userID) {
            return res.status(403).json({ errCode: 5000 })
        }

        const category = budget.budgetCategories.find(cat => cat._id.toString() === categoryID)
        category.price = Number(amount)

        await budget.save()

        return res.status(200).json({ errCode: 5001 })
    } catch (error) {
        console.log("editCategoryAmount() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }
}

module.exports = { editCategoryAmount }