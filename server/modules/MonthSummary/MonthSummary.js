const Budget = require("../../models/Budget");
const Transaction = require("../../models/Transaction");
const Category = require("../../models/Category");
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
            // SKIP
            // console.log("Žádné staré budgety k označení.")
        } else {
            // Aktualizujeme budgety na isFinished = true
            await Budget.updateMany(
                { _id: { $in: outdatedBudgets.map((budget) => budget._id) } },
                { $set: { isFinished: true } }
            )
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
        })

        const budgetCategories = budgetLastMonth?.budgetCategories || []
        const totalPlanned = budgetCategories.reduce((total, cat) => total + (cat.price || 0), 0)
        const totalSpent = allTransactions.reduce((sum, transaction) => sum + (transaction.amount || 0), 0)

        // ** Najde plánované výdaje a porovná se skutečnými výdaji **
        let categorySummary = []

        for (const oneCategory of budgetCategories) {

            const categoryTransactions = allTransactions.filter(
                (transaction) => transaction.category.toString() === oneCategory.categoryID.toString()
            )

            const totalSpentInCategory = categoryTransactions.reduce(
                (sum, transaction) => sum + (transaction.amount || 0),
                0
            )

            categorySummary.push({
                categoryID: oneCategory.categoryID,
                planned: oneCategory.price || 0,
                spent: totalSpentInCategory || 0,
            })
        }

        // ** Najít neplánované útraty **
        const allCategories = await Category.find({ createdBy: userID })

        const plannedCategoryIDs = budgetCategories.map(cat => cat.categoryID.toString())

        const unplannedCategories = allCategories
            .filter(oneCat => !plannedCategoryIDs.includes(oneCat._id.toString()))
            .map(oneCat => {
            
                const totalSpentInCategory = allTransactions
                    .filter(transaction => transaction.category.toString() === oneCat._id.toString())
                    .reduce((sum, transaction) => sum + (transaction.amount || 0), 0)
    
                    // Pokud jsou výdaje v kategorii > 0, vrátíme kategorii
                    if (totalSpentInCategory > 0) {
                        return {
                            categoryID: oneCat._id,
                            planned: 0,
                            spent: totalSpentInCategory
                        }
                    }
    
                    // Jinak nevracíme nic
                    return null
        }).filter(item => item !== null)    

        // * Odeslání notifikací pro měsíční přehledy
        if (totalPlanned || totalSpent) {
            await notifMonthSummary(month, year, userID, totalSpent, totalPlanned, categorySummary, unplannedCategories)
        }

    } catch (error) {
        console.error("monthSummary() => Error: ", error)
    }
};

module.exports = { monthSummary }
