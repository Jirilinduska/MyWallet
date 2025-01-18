const Budget = require("../../models/Budget");
const Transaction = require("../../models/Transaction");
const { notifMonthSummary } = require("../Notifications/notifMonthSummary");

const monthSummary = async (userID, year, month) => {

    try {
        if (month < 0) {
            month = 11 // Prosinec
            year -= 1
        }

        const outdatedBudgets = await Budget.find({
            $or: [
                { year: { $lt: year } },
                { year: year, month: { $lt: month } },
            ],
            isFinished: false,
        })

        if (outdatedBudgets.length === 0) {
            console.log("Žádné staré budgety k označení.")
        } else {
            // Aktualizujeme budgety na isFinished = true
            await Budget.updateMany(
                { _id: { $in: outdatedBudgets.map((budget) => budget._id) } },
                { $set: { isFinished: true } }
            );
            console.log(`Aktualizováno ${outdatedBudgets.length} starých budgetů.`)
        }

        const allTransactions = await Transaction.find({
            createdBy: userID,
            month,
            year,
            transCategory: "transaction",
        });

        const budgetLastMonth = await Budget.findOne({
            createdBy: userID,
            year,
            month,
        });

        const budgetCategories = budgetLastMonth?.budgetCategories || [];
        const totalPlanned = budgetCategories.reduce((total, cat) => total + (cat.price || 0), 0);
        const totalSpent = allTransactions.reduce((sum, transaction) => sum + (transaction.amount || 0), 0);

        if (totalPlanned || totalSpent) {
            await notifMonthSummary(month, year, userID, totalSpent, totalPlanned);
        }
    } catch (error) {
        console.error("monthSummary() => Error: ", error);
    }
};

module.exports = { monthSummary };
