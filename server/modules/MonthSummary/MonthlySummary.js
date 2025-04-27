const Budget = require("../../models/Budget");
const Transaction = require("../../models/Transaction");
const User = require("../../models/User");
const MonthSummaryModel = require("../../models/MonthSummary");
const { groupTransactionsByCategory } = require("../../libs/transactions");

const createMonthlySummary = async (userID, month, year) => {

    if(Number(month) === new Date().getMonth() + 1 && Number(year) === new Date().getFullYear()) {
        return
    }

    try {
        const user = await User.findById(userID)

        const existingSummary = await MonthSummaryModel.findOne({
            year,
            month,
            createdBy: user._id,
        })

        if(existingSummary) {
            return true 
        }

        const incomeTransactions = await Transaction.find({ year, month, createdBy: user._id, transCategory: "income" })
        const expenseTransactions = await Transaction.find({ year, month, createdBy: user._id, transCategory: "transaction" })
        const budgetLastMonth = await Budget.findOne({ month, year, createdBy: user._id })

        let totalIncome = incomeTransactions.length === 0 ? 0 : incomeTransactions.reduce((sum, tx) => sum + tx.amount, 0)
        let totalExpense = expenseTransactions.length === 0 ? 0 : expenseTransactions.reduce((sum, tx) => sum + tx.amount, 0)

        let expenseByCategory = groupTransactionsByCategory(expenseTransactions, budgetLastMonth ? budgetLastMonth.budgetCategories : [])
        let incomeByCategory = groupTransactionsByCategory(incomeTransactions, [])

        await MonthSummaryModel.create({
            year,
            month,
            totalExpense,
            totalIncome,
            createdBy: user._id,
            expenseByCategory,
            incomeByCategory,
        })

        if (budgetLastMonth) {
            budgetLastMonth.isFinished = true
            await budgetLastMonth.save()
        }
        
        return true
    } catch (error) {
        console.log("createMonthlySummary() => Error: ", error)
        return false
    }
};

module.exports = { createMonthlySummary };
