const User = require("../../../models/User")
const Transaction = require("../../../models/Transaction")
const Budget = require("../../../models/Budget")
const { countTotalPrice } = require("../../../libs/countTotalPrice")
const Category = require("../../../models/Category")


const getOverview = async(req,res) => {

    const { year, month } = req.params 
    const userID = req.user.userID

    const today = new Date()

    try {
        
        const user = await User.findById(userID)

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
            const category = await Category.findById(lastExpense.category).exec()

            if(category) {
                var lastExpenseCategory = category
            } else {
                console.log("No category found for the last expense.")
            }
        }

        const lastIncome = await Transaction.findOne({ createdBy: user._id, transCategory: "income" })
            .sort({ createdAt: -1 })
            .exec()

        if(lastIncome) {
            const category = await Category.findById(lastIncome.category).exec()

            if(category) {
                var lastIncomeCategory = category
            } else {
                console.log("No category found for the last income.")
            }
        }
        
        const categoriesYearExpense = await Transaction.aggregate([
            {
              $match: {
                year: parseInt(year),
                createdBy: user._id,
                transCategory: "transaction"
              }
            },
            {
              $group: {
                _id: "$category", // category je stále String, nic neměníme
                totalAmount: { $sum: "$amount" }
              }
            },
            {
              $sort: { totalAmount: -1 }
            },
            {
              $lookup: {
                from: 'categories', // Název kolekce pro kategorie (ověřte, zda je správný)
                let: { category_id: { $toObjectId: "$_id" } }, // Přetypování String na ObjectId
                pipeline: [
                  {
                    $match: {
                      $expr: { $eq: ["$_id", "$$category_id"] } // Porovnání ObjectId
                    }
                  }
                ],
                as: 'categoryDetails'
              }
            },
            {
              $unwind: "$categoryDetails" // Pokud existují víc než jedna kategorie, zajišťujeme, že to bude jeden objekt
            },
            {
              $project: {
                _id: 1,
                totalAmount: 1,
                categoryName: "$categoryDetails.name", // Výběr dat z kategorie
                categoryIconID: "$categoryDetails.iconID"
              }
            }
        ])

        const categoriesYearIncome = await Transaction.aggregate([
            {
              $match: {
                year: parseInt(year),
                createdBy: user._id,
                transCategory: "income"
              }
            },
            {
              $group: {
                _id: "$category", // category je stále String, nic neměníme
                totalAmount: { $sum: "$amount" }
              }
            },
            {
              $sort: { totalAmount: -1 }
            },
            {
              $lookup: {
                from: 'categories', // Název kolekce pro kategorie (ověřte, zda je správný)
                let: { category_id: { $toObjectId: "$_id" } }, // Přetypování String na ObjectId
                pipeline: [
                  {
                    $match: {
                      $expr: { $eq: ["$_id", "$$category_id"] } // Porovnání ObjectId
                    }
                  }
                ],
                as: 'categoryDetails'
              }
            },
            {
              $unwind: "$categoryDetails" // Pokud existují víc než jedna kategorie, zajišťujeme, že to bude jeden objekt
            },
            {
              $project: {
                _id: 1,
                totalAmount: 1,
                categoryName: "$categoryDetails.name", // Výběr dat z kategorie
                categoryIconID: "$categoryDetails.iconID"
              }
            }
        ])

        // TODO ! ODSTRANIT ?
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
            todayExpense, 
            lastExpense,
            lastExpenseCategory,
            lastIncome,
            lastIncomeCategory,
            categoriesYearExpense,
            categoriesYearIncome
        }

        return res.status(200).json(result)

    } catch (error) {
        console.log("getOverview() => : ", error)
        return res.status(500).json({ message: "Server error." })
    }

}


module.exports = { getOverview }