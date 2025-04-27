const User = require("../../../models/User")
const Transaction = require("../../../models/Transaction")
const Category = require("../../../models/Category")


const getTodayTransactions = async(req,res) => {

    const userID = req.user.userID

    const today = new Date()

    try {
        
        const user = await User.findById(userID)

        const todayExpense = await Transaction.find({
          createdBy: user._id,
          transCategory: "transaction",
          year: today.getFullYear(),
          month: today.getMonth() + 1,
          day: today.getDate()
        })

        const lastIncome = await Transaction.findOne({ createdBy: user._id, transCategory: "income" })
          .sort({ createdAt: -1 })
          .exec()

        if(lastIncome) {
          const category = await Category.findById(lastIncome.category).exec()

          if(category) {
            var lastIncomeCategory = category
          } else {
            // console.log("No category found for the last income.")
          }
        }

        const lastExpense = await Transaction.findOne({ createdBy: user._id, transCategory: "transaction" })
          .sort({ createdAt: -1 })
          .exec()
    
        if(lastExpense) {
          const category = await Category.findById(lastExpense.category).exec()

          if(category) {
            var lastExpenseCategory = category
          } else {
            // console.log("No category found for the last expense.")
          }
        }

        const result = {
          todayExpense,
          lastExpense,
          lastIncome,
          lastExpenseCategory,
          lastIncomeCategory
        }

        return res.status(200).json(result)

    } catch (error) {
        console.log("getTodayTransactions() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }

}


module.exports = { getTodayTransactions }