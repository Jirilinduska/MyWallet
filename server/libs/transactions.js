

// Vytvoření kategorií pro monthly summary
const groupTransactionsByCategory = (transactions, budgetCategories) => {
    const result = []

    if (transactions.length === 0) {
        return result
    }

    for (const tx of transactions) {
        const cat = tx.category

        const budgetCategory = cat !== "income" ? budgetCategories.find(budgetCat => budgetCat.categoryID.toString() === cat.toString()) : null

        let category = result.find(item => item.categoryID.toString() === cat.toString())

        if (!category) {
            category = {
                categoryID: cat,
                total: tx.amount,
                count: 1,
                maxTransaction: {
                    title: tx.title,
                    amount: tx.amount,
                    year: tx.year,
                    month: tx.month,
                    day: tx.day,
                    transCategory: tx.transCategory,
                    createdAt: tx.createdAt
                },
                planned: cat === "income" ? 0 : (budgetCategory ? budgetCategory.price : 0)
            }
            result.push(category)

        } else {
            category.total += tx.amount
            category.count += 1

            if(category.maxTransaction.amount < tx.amount) {
                category.maxTransaction.amount = tx.amount
                category.maxTransaction.title  = tx.title
                category.maxTransaction.day    = tx.day
                category.maxTransaction.year   = tx.year
                category.maxTransaction.month  = tx.month
                category.maxTransaction.transCategory = tx.transCategory
                category.maxTransaction.createdAt = new Date(tx.year, tx.month, tx.day)
            }
        }
    }
    return result
}


module.exports = { groupTransactionsByCategory }