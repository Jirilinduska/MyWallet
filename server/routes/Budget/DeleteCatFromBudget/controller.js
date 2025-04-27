const Budget = require("../../../models/Budget")

const deleteCatFromBudget = async(req,res) => {

    const { categoryID, budgetID } = req.params

    const userID = req.user.userID

    try {
        const budget = await Budget.findById(budgetID)

        if(budget.createdBy.toString() !== userID) {
            return res.status(403).json({ errCode: 5000 })
        }

        const newArray = budget.budgetCategories.filter(cat => cat._id.toString() !== categoryID)
        budget.budgetCategories = newArray

        await budget.save()

        return res.status(200).json({ errCode: 5001 })
    } catch (error) {
        console.log("deleteCatFromBudget() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }
}

module.exports = { deleteCatFromBudget }