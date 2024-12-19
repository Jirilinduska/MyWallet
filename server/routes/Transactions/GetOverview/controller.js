const User = require("../../../models/User")
const Transaction = require("../../../models/Transaction")
const Budget = require("../../../models/Budget")
const { countTotalPrice } = require("../../../libs/countTotalPrice")
const Category = require("../../../models/Category")


const getOverview = async(req,res) => {

    const { year, month } = req.params 
    const userID = req.userID

    const today = new Date()

    try {
        
        const user = await User.findOne(userID)

        // Veškeré transakce podle roku
        const expense = await Transaction.find({ year: year, createdBy: user._id, transCategory: "transaction" })
        const income  = await Transaction.find({ year: year, createdBy: user._id, transCategory: "income" })

        // Veškeré transakce podle aktuálního měsíce
        const expenseThisMonth = await Transaction.find({ year: year, month: month, createdBy: user._id, transCategory: "transaction" })
        const incomeThisMonth  = await Transaction.find({ year: year, month: month, createdBy: user._id, transCategory: "income" })
        const budgetThisMonth = await Budget.find({ year: year, month: month, createdBy: user._id })

        const lastExpense = await Transaction.findOne({ createdBy: user._id, transCategory: "transaction" })
            .sort({ createdAt: -1 })
            .exec()
        
        if(lastExpense) {
            const category = await Category.findOne({ 
                // TODO tohle zmenit na ID ne name!
                name: lastExpense.category, 
                createdBy: user._id
            }).exec()

            if(category) {
                var lastExpenseIconID = category.iconID
            } else {
                console.log("No category found for the last expense.")
            }
        }
        
        const todayExpense = await Transaction.find({
            createdBy: user._id,
            transCategory: "transaction",
            year: today.getFullYear(),
            month: today.getMonth() + 1,
            day: today.getDate()
        })

        const monthBudget = budgetThisMonth.length > 0
            ? budgetThisMonth[0]?.budgetCategories.reduce((total, oneCat) => { return total + oneCat.price }, 0)
            : 0

        const yearTotalExpense = expense.reduce((total, transaction) => total + transaction.amount, 0)
        const yearTotalIncome  = countTotalPrice(income)
        const savedThisYear = yearTotalIncome - yearTotalExpense

        const monthTotalExpense = countTotalPrice(expenseThisMonth)
        const monthTotalIncome = countTotalPrice(incomeThisMonth)
        const savedThisMonth = monthTotalIncome - monthTotalExpense


        // TODO - tento mesic data pro graf?

        const result = {
            yearTotalExpense,
            yearTotalIncome,
            savedThisYear,
            monthTotalExpense,
            monthTotalIncome,
            savedThisMonth,
            monthBudget,
            todayExpense, // TODO Přidáno - interface
            lastExpense, // TODO Přidáno - interface
            lastExpenseIconID
        }

        return res.status(200).json(result)

    } catch (error) {
        console.log("getOverview() => : ", error)
        return res.status(500).json({ message: "Server error." })
    }

}


module.exports = { getOverview }