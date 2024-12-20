const Category = require("../../../models/Category")
const Transaction = require("../../../models/Transaction")
const User = require("../../../models/User")

const getCategoryInfo = async(req,res) => {

    const { id } = req.params
    const userID = req.user.userID

    try {
        
        const user = await User.findById(userID)

        if(!user) return res.status(400).json({ message: "User not found" })

        const category = await Category.findById(id)

        if(!category) return res.status(400).json({ message: "Category not found" })

        const allTransactions = await Transaction.find({ category: category._id })

        // Sestavení dat pro response
        const totalAmount = allTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)
        const transactionCount = allTransactions.length
        const averageAmount = totalAmount / transactionCount || 0

        const largestTransaction = allTransactions.reduce((max, transaction) => {
            return transaction.amount > max.amount ? transaction : max
        }, { amount: 0 })

        // Výstup:
        // {
        //     "2024-12": 200000,
        //     "2024-11": 222
        //   }
        const monthlySummary = allTransactions.reduce((summary, transaction) => {
            const key = `${transaction.year}-${transaction.month}`
            summary[key] = (summary[key] || 0) + transaction.amount
            return summary
        }, {})

        // Počet transackí za měsic :)
        const monthlyCounts = allTransactions.reduce((counts, transaction) => {
            const key = `${transaction.year}-${transaction.month}`
            counts[key] = (counts[key] || 0) + 1
            return counts
        }, {})

        const yearlySummary = allTransactions.reduce((summary, transaction) => {
            const key = transaction.year
            summary[key] = (summary[key] || 0) + transaction.amount
            return summary
        }, {})
        

        const largestTransactionsByMonth = []

        allTransactions.forEach(transaction => {
            const key = `${transaction.year}-${transaction.month}`
            const existingTransaction = largestTransactionsByMonth.find(item => item.key === key)

            if (!existingTransaction || transaction.amount > existingTransaction.transaction.amount) {

            if (existingTransaction) {
                existingTransaction.transaction = transaction;
            } else {
                largestTransactionsByMonth.push({
                    key,
                    transaction
                })
            }}
        })

        
        const result = {
            categoryID: category._id,
            categoryName: category.name,
            iconID: category.iconID,
            categoryType: category.categoryType,
            totalAmount,
            transactionCount,
            averageAmount,
            monthlySummary,
            monthlyCounts,
            largestTransaction,
            largestTransactionsByMonth,
            yearlySummary
        }

        return res.status(200).json(result)

    } catch (error) {
        console.log("getCategoryInfo() => : ", error)
        return res.status(500).json({ message: "Server error." })
    }

}

module.exports = { getCategoryInfo }