const Budget = require("../../../models/Budget")
const MonthSummary = require("../../../models/MonthSummary")
const Transaction = require("../../../models/Transaction")
const { createMonthlySummary } = require("../../../modules/MonthSummary/MonthlySummary")

const getBudgetByID = async(req,res) => {

    const { budgetID } = req.params
    const userID = req.user.userID

    const thisMonth = new Date().getMonth() + 1
    const thisYear = new Date().getFullYear()
    
    try {

        const budget = await Budget.findById(budgetID)
        .populate({
            path: 'budgetCategories.categoryID',
            select: 'name iconID'
        })

        if(!budget.createdBy.equals(userID)) {
            return res.status(500).json({ errCode: 5000 })
        }

        const budgetObj = budget.toObject()
        const plannedPrice = budget.budgetCategories.reduce((a,b) => a + b.price, 0)
        let spentPrice = 0

        // Pokud je to tento mesic... musim prohledat utraty v transakcích...
        if(thisMonth === budget.month && thisYear === budget.year) {

            const transactions = await Transaction.find({ 
                createdBy: userID, 
                month: budget.month, 
                year: budget.year, 
                transCategory: "transaction" 
            })

            const spentPerCategory = {}
            for (const transaction of transactions) {
                const catID = transaction.category.toString()
                spentPerCategory[catID] = (spentPerCategory[catID] || 0) + transaction.amount
            }

            budgetObj.budgetCategories = budgetObj.budgetCategories.map(cat => {
                const catID = cat.categoryID._id.toString()
                return {
                    ...cat,
                    spent: spentPerCategory[catID] || 0
                }
            })

            spentPrice = transactions.reduce((a,b) => a + b.amount, 0)

        } else { // Pokud to není tento mesíc... stačí monthlySummary
            
            let summary = await MonthSummary.findOne({ month: budget.month, year: budget.year, createdBy: userID })
            
            if(!summary) {
                await createMonthlySummary(userID, budget.month, budget.year)
                summary = await MonthSummary.findOne({ month: budget.month, year: budget.year, createdBy: userID })
            }

            spentPrice = summary.totalExpense

            const spentPerCategory = {}

            for (const oneSummaryCat of summary.expenseByCategory) {
                const catID = oneSummaryCat.categoryID.toString()
                spentPerCategory[catID] = oneSummaryCat.total
            }

            budgetObj.budgetCategories = budgetObj.budgetCategories.map(cat => {
                const catID = cat.categoryID._id.toString()
                return {
                    ...cat,
                    spent: spentPerCategory[catID] || 0
                }
            })
        }

        const result = {
            plannedPrice,
            spentPrice,
            _id: budget._id,
            month: budget.month,
            year: budget.year,
            budgetCategories: budgetObj.budgetCategories,
            isFinished: budget.isFinished
        }

        return res.status(200).json(result)

    } catch (error) {
        console.log("getBudgetByID() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }

}

module.exports = { getBudgetByID }

