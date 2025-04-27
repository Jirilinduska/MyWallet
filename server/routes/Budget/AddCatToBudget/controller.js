const Budget = require("../../../models/Budget")

const addCatToBudget = async(req,res) => {

    const { categoryID, budgetID } = req.body
    const userID = req.user.userID

    try {
        const budget = await Budget.findById(budgetID)
        if(budget.createdBy.toString() !== userID) {
            return res.status(403).json({ errCode: 5000 })
        }

        budget.budgetCategories.push({ categoryID, price: 0 })

        await budget.save()
        return res.status(200).json({ errCode: 5001 })
    } catch (error) {
        console.log("addCatToBudget() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }
}

module.exports = { addCatToBudget }