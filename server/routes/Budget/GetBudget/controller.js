const User = require("../../../models/User")
const Budget = require("../../../models/Budget")
const Category = require("../../../models/Category")

const getBudget = async(req,res) => {

    const userID = req.userID
    
    try {

        const user = await User.findOne(userID)

        const budgets = await Budget.find({ createdBy: user._id })
            .populate({
                path: 'budgetCategories.categoryID',
                select: 'name iconID'
        })

        if (!budgets || budgets.length === 0) return res.status(400).json({ message: "Budgets not found" });


        const arrangeBudgets = budgets.map((budget) => {

            const totalPricePlanned = budget.budgetCategories.reduce((total, oneCat) => {
              return total + oneCat.price
            }, 0)
          
            return {
                _id: budget._id,
                year: budget.year,
                month: budget.month,
                budgetCategories: budget.budgetCategories.map((oneCat) => ({
                    category: oneCat.categoryID,
                    price: oneCat.price,
              })),
              totalPricePlanned, 
            }
        })

        return res.status(200).json(arrangeBudgets)

    } catch (error) {
        console.log("getBudget() => : ", error)
        return res.status(500).json({ message: "Server error." })
    }

}

module.exports = { getBudget }

