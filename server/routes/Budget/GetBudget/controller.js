const User = require("../../../models/User")
const Budget = require("../../../models/Budget")
const Transaction = require("../../../models/Transaction")

const getBudget = async(req,res) => {

    const userID = req.user.userID
    
    try {

        const user = await User.findById(userID)

        const budgets = await Budget.find({ createdBy: user._id })
            .populate({
                path: 'budgetCategories.categoryID',
                select: 'name iconID'
        })

        if (!budgets || budgets.length === 0) return res.status(400).json({ message: "Budgets not found" })

        const allTransactions = await Transaction.find({ createdBy: user._id })

        const arrangeBudgets = budgets.map((budget) => {

            const totalPricePlanned = budget.budgetCategories.reduce((total, oneCat) => {
              return total + oneCat.price
            }, 0)

            const arrangeBudgetCategories = budget.budgetCategories.map((oneCat) => {
                // Spočítáme částku utracenou pro danou kategorii v daném měsíci a roce
                const spent = allTransactions
                  .filter(
                    (transaction) =>
                      transaction.category === oneCat.categoryID._id.toString() &&
                      transaction.year === budget.year &&
                      transaction.month === budget.month
                  )
                  .reduce((sum, transaction) => sum + transaction.amount, 0)
        
                return {
                  category: oneCat.categoryID,
                  price: oneCat.price,
                  spent,
                }
              })
          
            return {
                _id: budget._id,
                year: budget.year,
                month: budget.month,
                budgetCategories: arrangeBudgetCategories,
              totalPricePlanned, 
            }
        })

        return res.status(200).json(arrangeBudgets)

    } catch (error) {
        console.log("getBudget() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }

}

module.exports = { getBudget }

