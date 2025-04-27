const User = require("../../models/User")
const Transaction = require("../../models/Transaction")
const Category = require("../../models/Category")
const YearlySummary = require("../../models/YearlySummary")
const MontlySummary = require("../../models/MonthSummary")
const { createMonthlySummary } = require("../MonthSummary/MonthlySummary")

const CreateYearlySummary = async(userID, year) => {

    const thisYear = new Date().getFullYear()

    if(thisYear === Number(year)) {
        return
    }

    try {
        const user = await User.findById(userID)

        const isSummaryCheck = await YearlySummary.findOne({ createdBy: user._id, year })

        if(isSummaryCheck) {
            return 

        } else {
            const transactionsYear = await Transaction.find({ createdBy: user._id, year, transCategory: "transaction" })
            const incomeYear = await Transaction.find({ createdBy: user._id, year, transCategory: "income" })

            const totalExpense = transactionsYear.reduce(( a, b ) => a + b.amount, 0)
            const totalIncome  = incomeYear.reduce(( a, b ) => a + b.amount, 0) 

            let incomeByCategory = []
            let expenseByCategory = []


            for(let expense of transactionsYear) {

                let categoryExists = expenseByCategory.find(item => item.categoryID.toString() === expense.category.toString())

                if(categoryExists) {
                    categoryExists.total += expense.amount
                    categoryExists.count += 1
                    if (expense.amount > categoryExists.maxTransaction.amount) {
                        categoryExists.maxTransaction = {
                            title: expense.title,
                            amount: expense.amount,
                            day: expense.day,
                            year: expense.year,
                            month: expense.month,
                            transCategory: expense.transCategory,
                            createdAt: expense.createdAt
                        }
                    }
                } else {
                    const category = await Category.findById(expense.category)

                    expenseByCategory.push({
                        categoryID: category._id,
                        total: expense.amount,
                        count: 1,
                        maxTransaction: {
                            title: expense.title,
                            amount: expense.amount,
                            day: expense.day,
                            year: expense.year,
                            month: expense.month,
                            transCategory: expense.transCategory,
                            createdAt: expense.createdAt
                        }
                    })
                }
            }
            
            for (let income of incomeYear) {
                let categoryExists = incomeByCategory.find(item => item.categoryID.toString() === income.category.toString())
                
                if (categoryExists) {
                    categoryExists.total += income.amount
                    categoryExists.count += 1
                    if (income.amount > categoryExists.maxTransaction.amount) {
                        categoryExists.maxTransaction = {
                            title: income.title,
                            amount: income.amount,
                            day: income.day,
                            year: income.year,
                            month: income.month,
                            transCategory: income.transCategory,
                            createdAt: income.createdAt
                        }
                    }
                } else {
                    const category = await Category.findById(income.category)
                    incomeByCategory.push({
                        categoryID: category._id,
                        total: income.amount,
                        count: 1,
                        maxTransaction: {
                            title: income.title,
                            amount: income.amount,
                            day: income.day,
                            year: income.year,
                            month: income.month,
                            transCategory: income.transCategory,
                            createdAt: income.createdAt
                        }
                    })
                }
            }


            await YearlySummary.create({
                createdBy: user._id,
                year,
                totalExpense,
                totalIncome,
                incomeByCategory,
                expenseByCategory
            })

            // Potřebuji ověřit, zda jsou pro všechny měsíce vytvoření monthlySummaries!
            const monthSummaries = await MontlySummary.find({ createdBy: user._id, year })
            const existingMonths = monthSummaries.map(summary => summary.month)
            const missingMonths = []

            for (let m = 1; m <= 12; m++) {
                if (!existingMonths.includes(m)) {
                    missingMonths.push(m);
                }
            }

            if (missingMonths.length > 0) {
                for (let missingMonth of missingMonths) {
                    await createMonthlySummary(userID, missingMonth, year)
                }
            }

            await Transaction.deleteMany({ createdBy: userID, year })
        }



    } catch (error) {
        console.log("CreateYearlySummary() => :", error)
    }
}

module.exports = { CreateYearlySummary }