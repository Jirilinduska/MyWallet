const Budget = require("../../models/Budget")
const User = require("../../models/User")
const Transaction = require("../../models/Transaction")
const { notifMonthSummary } = require("../../modules/Notifications/notifMonthSummary")

// Spouští se každý 1. den v měsíci v 00:01 h
const cronMonthSummary = async() => {

    try {
        
        const today = new Date()

        // * "Current = předchozí měsíc (tato funkce se provádí 1.den v novém měsíci)"
        let currentMonth = today.getMonth()
        let currentYear = today.getFullYear()

        if (currentMonth === 0) { 
            currentMonth = 12
            currentYear -= 1
        }

        const outdatedBudgets = await Budget.find({
            $or: [
                { year: { $lt: currentYear } },
                { year: currentYear, month: { $lt: currentMonth } },
            ],
            isFinished: false,
        })

        if (outdatedBudgets.length === 0) {
            console.log("Žádné staré budgety k označení.")
        }

        // Aktualizujeme budgety na isFinished = true
        const updatedBudgets = await Budget.updateMany(
            {
                _id: { $in: outdatedBudgets.map((budget) => budget._id) },
            },
            { $set: { isFinished: true } }
        )

        const allUsers = await User.find()

        for(const user of allUsers) {

            const allTransactions  = await Transaction.find({
                createdBy: user._id,
                month: currentMonth,
                year: currentYear,
                transCategory: "transaction"
            })

            const budgetLastMonth = await Budget.findOne({
                year: currentYear,
                month: currentMonth
            })

            const budgetCategories = budgetLastMonth?.budgetCategories || []
            const totalPlanned = budgetCategories.reduce((total, oneCat) => total + (oneCat.price || 0), 0)
            const totalSpent = allTransactions.reduce((sum, transaction) => sum + (transaction.amount || 0), 0)

            await notifMonthSummary(currentMonth, currentYear, user._id, totalSpent, totalPlanned)
        }

        // console.log(`Označeno ${updatedBudgets.modifiedCount} budgetů jako dokončené.`)
        return res.status(200).json({ errCode: 5001 })

    } catch (error) {
        console.error("CronJob: monthSummary() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }

}


module.exports = cronMonthSummary