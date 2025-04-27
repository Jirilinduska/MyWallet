const Category = require("../../../models/Category")
const Transaction = require("../../../models/Transaction")
const YearlySummary = require("../../../models/YearlySummary")
const { CreateYearlySummary } = require("../../../modules/CreateYearlySummary/CreateYearlySummary")

const getCategoryInfo = async(req,res) => {

    const { id } = req.params
    const userID = req.user.userID

    const currentYear = new Date().getFullYear()

    try {
        const category = await Category.findById(id)
        if(!category) return res.status(400).json({ errCode: 2003 })

        const isIncome = category.categoryType === "income"

        // Částka tento rok
        const thisYearTransactions = await Transaction.find({ category: category._id, year: currentYear })
        const thisYearTotalAmount = thisYearTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);


        const yearlyTotals = {}
        const summaries = await YearlySummary.find({ createdBy: userID })

        let oldestYear = currentYear

        summaries.forEach(summary => {
            const list = isIncome ? summary.incomeByCategory : summary.expenseByCategory;
            const found = list.find(cat => cat.categoryID.toString() === category._id.toString());
            if (found && summary.year < oldestYear) {
              oldestYear = summary.year;
            }
        })

        if (oldestYear === currentYear) {
            oldestYear = currentYear
        }

        for (let year = oldestYear; year <= currentYear; year++) {
            let summary = summaries.find(s => s.year === year)
      
            if (!summary) {
              await CreateYearlySummary(userID, year)
              summary = await YearlySummary.findOne({ year, createdBy: userID })
            }
      
            let total = 0
      
            if (summary) {
              const list = isIncome ? summary.incomeByCategory : summary.expenseByCategory
              const catInfo = list.find(cat => cat.categoryID.toString() === category._id.toString())
              total = catInfo ? catInfo.total : 0;
            }
      
            yearlyTotals[year] = total
        }

        yearlyTotals[currentYear] = thisYearTotalAmount
        const totalAmount = Object.values(yearlyTotals).reduce((sum, val) => sum + val, 0)

        const result = {
            categoryID: category._id,
            categoryName: category.name,
            iconID: category.iconID,
            categoryType: category.categoryType,
            yearlyTotals,
            totalAmount
        }

        return res.status(200).json(result)

    } catch (error) {
        console.log("getCategoryInfo() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }

}

module.exports = { getCategoryInfo }