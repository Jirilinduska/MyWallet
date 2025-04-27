const User = require("../../../models/User")
const Transaction = require("../../../models/Transaction")
const Budget = require("../../../models/Budget")
const YearlySummary = require("../../../models/YearlySummary")
const { CreateYearlySummary } = require("../../../modules/CreateYearlySummary/CreateYearlySummary")
const { groupByCategory } = require("../../../modules/Categories/GroupByCategory")
const MonthSummary = require("../../../models/MonthSummary")
const { createMonthlySummary } = require("../../../modules/MonthSummary/MonthlySummary")


const getOverview = async(req,res) => {

    const userID = req.user.userID
    const year = Number(req.params.year)

    const today = new Date()
    const thisMonth = today.getMonth() + 1
    const thisYear  = today.getFullYear() 

    let totalExpenseYear = 0;
    let totalIncomeYear = 0;
    let totalExpenseThisMonth = 0;
    let totalIncomeThisMonth = 0;
    let monthBudget = 0

    let incomeCategoriesYear  = []
    let expenseCategoriesYear = []
    let overviewMonths = []

    try {
        const user = await User.findById(userID)

        if(thisYear !== year) {
          // * PŘEDCHOZÍ ROKY 
          const yearSummary = await YearlySummary.findOne({ createdBy: user._id, year })

          if(!yearSummary) {
            await CreateYearlySummary(userID, year)
            const newSummary = await YearlySummary.findOne({ createdBy: user._id, year })
            totalExpenseYear = newSummary.totalExpense
            totalIncomeYear  = newSummary.totalIncome
            incomeCategoriesYear  = newSummary.incomeByCategory
            expenseCategoriesYear = newSummary.expenseByCategory
            
          } else {
            totalExpenseYear = yearSummary.totalExpense
            totalIncomeYear  = yearSummary.totalIncome
            incomeCategoriesYear  = yearSummary.incomeByCategory
            expenseCategoriesYear = yearSummary.expenseByCategory
          }

          for (let i = 1; i <= 12; i++) {
            let summaryMonth = await MonthSummary.findOne({ createdBy: user._id, year, month: i })

            if(!summaryMonth) {
              await createMonthlySummary(userID, i, year)
              summaryMonth = await MonthSummary.findOne({ createdBy: user._id, year, month: i })
            }

            const saved = summaryMonth.totalIncome - summaryMonth.totalExpense
            const savedValue = saved > 0 ? saved : 0

            overviewMonths.push({
              month: summaryMonth.month,
              year: summaryMonth.year,
              expense: summaryMonth.totalExpense,
              income: summaryMonth.totalIncome,
              saved: savedValue
            })
          }

        } else { 

          // * TENTO ROK 

          // Všechny transakce pro tento rok
          const expenseThisYear = await Transaction.find({ year: thisYear, createdBy: user._id, transCategory: "transaction" });
          const incomeThisYear = await Transaction.find({ year: thisYear, createdBy: user._id, transCategory: "income" });

          // Součet pro tento rok (number)
          totalExpenseYear = expenseThisYear.reduce((summary, tx) => summary + tx.amount, 0)
          totalIncomeYear = incomeThisYear.reduce((summary, tx) => summary + tx.amount, 0)


          // Všechny Transakce pro tento měsíc 
          const expenseThisMonth = await Transaction.find({ year: thisYear, month: thisMonth, createdBy: user._id, transCategory: "transaction" });
          const incomeThisMonth = await Transaction.find({ year: thisYear, month: thisMonth, createdBy: user._id, transCategory: "income" });

          // Součet pro tento měsíc (number)
          totalExpenseThisMonth = expenseThisMonth.reduce((summary, tx) => summary + tx.amount, 0)
          totalIncomeThisMonth = incomeThisMonth.reduce((summary, tx) => summary + tx.amount, 0)

          // Budget tento mesic
          const budgetThisMonth = await Budget.find({ year: year, month: thisMonth, createdBy: user._id })
          // převod na částku (number)
          monthBudget = budgetThisMonth.length > 0
              ? budgetThisMonth[0]?.budgetCategories.reduce((total, oneCat) => { return total + oneCat.price }, 0)
              : 0

          expenseCategoriesYear = groupByCategory(expenseThisYear)
          incomeCategoriesYear  = groupByCategory(incomeThisYear)

          for (let i = 1; i <= thisMonth - 1; i++) {
            let summaryMonth = await MonthSummary.findOne({ createdBy: user._id, year, month: i })

            if(!summaryMonth) {
              await createMonthlySummary(userID, i, year)
              summaryMonth = await MonthSummary.findOne({ createdBy: user._id, year, month: i })
            }

            const saved = summaryMonth.totalIncome - summaryMonth.totalExpense
            const savedValue = saved > 0 ? saved : 0

            overviewMonths.push({
              month: summaryMonth.month,
              year: summaryMonth.year,
              expense: summaryMonth.totalExpense,
              income: summaryMonth.totalIncome,
              saved: savedValue
            })
          }
        }

        const savedAmountYear = totalIncomeYear - totalExpenseYear
        expenseCategoriesYear.sort((a, b) => b.total - a.total)
        incomeCategoriesYear.sort((a, b) => b.total - a.total)


        const result = {
          yearTotalExpense: totalExpenseYear,
          yearTotalIncome: totalIncomeYear,
          savedThisYear: savedAmountYear,
          monthTotalExpense: totalExpenseThisMonth,
          monthTotalIncome: totalIncomeThisMonth,
          monthBudget,
          categoriesYearExpense: expenseCategoriesYear,
          categoriesYearIncome: incomeCategoriesYear,
          overviewMonths
        }

      return res.status(200).json(result)

    } catch (error) {
        console.log("getOverview() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }

}


module.exports = { getOverview }