const User = require("../../../models/User")
const Transaction = require("../../../models/Transaction")
const { countTotalPrice } = require("../../../libs/countTotalPrice")


const getOverview = async(req,res) => {

    const { year, month } = req.params 
    const userID = req.userID

    try {
        
        const user = await User.findOne(userID)

        // Veškeré transakce podle roku
        const expense = await Transaction.find({ year: year, createdBy: user._id, transCategory: "transaction" })
        const income  = await Transaction.find({ year: year, createdBy: user._id, transCategory: "income" })

        // Veškeré transakce podle aktuálního měsíce
        const expenseThisMonth = await Transaction.find({ year: year, month: month, createdBy: user._id, transCategory: "transaction" })
        const incomeThisMonth  = await Transaction.find({ year: year, month: month, createdBy: user._id, transCategory: "income" })

        // TODO - Budget
        // const budgetThisMonth = 

        // const yearTotalExpense = countTotalPrice(expense)
        const yearTotalExpense = expense.reduce((total, transaction) => total + transaction.amount, 0)
        const yearTotalIncome  = countTotalPrice(income)
        const savedThisYear = yearTotalIncome - yearTotalExpense

        const monthTotalExpense = countTotalPrice(expenseThisMonth)
        const monthTotalIncome = countTotalPrice(incomeThisMonth)
        const savedThisMonth = monthTotalIncome - monthTotalExpense

        // TODO - tento mesic data pro graf

        const result = {
            yearTotalExpense,
            yearTotalIncome,
            savedThisYear,
            monthTotalExpense,
            monthTotalIncome,
            savedThisMonth
        }

        return res.status(200).json(result)

    } catch (error) {
        console.log("getOverview() => : ", error)
        return res.status(500).json({ message: "Server error." })
    }

}


module.exports = { getOverview }