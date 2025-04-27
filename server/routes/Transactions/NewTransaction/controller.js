const User = require("../../../models/User")
const Transaction = require("../../../models/Transaction")
const MonthSummary = require("../../../models/MonthSummary")
const { createMonthlySummary } = require("../../../modules/MonthSummary/MonthlySummary")
const YearlySummary = require("../../../models/YearlySummary")
const { CreateYearlySummary } = require("../../../modules/CreateYearlySummary/CreateYearlySummary")

const newTransaction = async(req, res) => {

    const { title, amount, categoryID, year, month, day, transCategory } = req.body
    const userID = req.user.userID

    const now = new Date()
    const thisMonth = now.getMonth() + 1
    const thisYear = now.getFullYear()
    const isCurrentMonth = thisMonth === Number(month) && thisYear === Number(year)
    const notThisYear = Number(year) < thisYear
    const isIncome = transCategory === 'income'
    const numericAmount = Number(amount)

    try {
        const user = await User.findById(userID)

        // Pokud přidávám starší transakci (jiný rok), potřeba změny uložit v monthSummary + yearSummary
        if(notThisYear) {
            
            let yearSummary = await YearlySummary.findOne({ createdBy: userID, year })
            if(!yearSummary) {
                await CreateYearlySummary(userID, year)
                yearSummary = await YearlySummary.findOne({ createdBy: userID, year })
            }

            let monthSummary = await MonthSummary.findOne({ createdBy: userID, year, month })
            if(!monthSummary) {
                await createMonthlySummary(userID, month, year)
                monthSummary = await MonthSummary.findOne({ createdBy: userID, year, month })
            }

            // Income
            if(isIncome) {
                yearSummary.totalIncome += numericAmount
                const findCategory = yearSummary.incomeByCategory.find(cat => cat.categoryID === categoryID)

                // Pokud kategorie existuje (yearSummary)
                if(findCategory) {     
                    findCategory.total += numericAmount
                    findCategory.count++ // + 1

                    // Pokud je transakce větší jak maxTransaction v categorii (yearSummary)
                    if(findCategory.maxTransaction.amount < numericAmount) {
                        findCategory.maxTransaction = {
                            title,
                            amount: numericAmount,
                            day,
                            year,
                            month,
                            transCategory,
                            createdAt: new Date(year, month, day)
                        }
                    }
                } else { // Pokud kategorie neexistuje (yearSummary)
                    const newCat = {
                        categoryID,
                        total: numericAmount,
                        count: 1,
                        maxTransaction: {
                            title,
                            amount: numericAmount,
                            day,
                            year,
                            month,
                            transCategory,
                            createdAt: new Date(year, month, day)
                        }
                    }
                    yearSummary.incomeByCategory.push(newCat)

                }

                const catMonthSummary = monthSummary.incomeByCategory.find(cat => cat.categoryID === categoryID)
                monthSummary.totalIncome += numericAmount

                // Pokud kategorie existuje (monthSummary)
                if(catMonthSummary) {
                    catMonthSummary.total += numericAmount
                    catMonthSummary.count++

                    // Pokud je transakce větší jak maxTransaction (monthSummary)
                    if(catMonthSummary.maxTransaction.amount < numericAmount) {
                        catMonthSummary.maxTransaction = {
                            title,
                            amount: numericAmount,
                            day,
                            year,
                            month,
                            transCategory,
                            createdAt: new Date(year, month, day)
                        }
                    }
                } else { // Pokud kategorie neexistuje (monthSummary)
                    const newCat = {
                        categoryID,
                        total: numericAmount,
                        count: 1,
                        maxTransaction: {
                            title,
                            amount: numericAmount,
                            day,
                            year,
                            month,
                            transCategory,
                            createdAt: new Date(year, month, day)
                        }
                    }
                    monthSummary.incomeByCategory.push(newCat)
                }


            } else { // EXPENSE
                yearSummary.totalExpense += numericAmount
                const findCategory = yearSummary.expenseByCategory.find(cat => cat.categoryID === categoryID)

                // Pokud kategorie existuje (yearSummary)
                if(findCategory) {
                    findCategory.total += numericAmount

                    // Pokud je transakce větší jak maxTransaction (yearSummary)
                    if(findCategory.maxTransaction.amount < numericAmount) {
                        findCategory.maxTransaction = {
                            title,
                            amount: numericAmount,
                            day,
                            year,
                            month,
                            transCategory,
                            createdAt: new Date(year, month, day)
                        }
                    }
                } else { // Pokud kategorie neexistuje
                    const newCat = {
                        categoryID,
                        total: numericAmount,
                        count: 1,
                        maxTransaction: {
                            title,
                            amount: numericAmount,
                            day,
                            year,
                            month,
                            transCategory,
                            createdAt: new Date(year, month, day)
                        }
                    }
                    yearSummary.expenseByCategory.push(newCat)
                }

                const catMonthSummary = monthSummary.expenseByCategory.find(cat => cat.categoryID === categoryID)
                monthSummary.totalExpense += numericAmount

                // Pokud kategorie existuje (monthSummary)
                if(catMonthSummary) {
                    catMonthSummary.total += numericAmount
                    catMonthSummary.count++

                    // Pokud je transakce větší jak maxTransaction (monthSummary)
                    if(catMonthSummary.maxTransaction.amount < numericAmount) {
                        catMonthSummary.maxTransaction = {
                            title,
                            amount: numericAmount,
                            day,
                            year,
                            month,
                            transCategory,
                            createdAt: new Date(year, month, day)
                        }
                    }
                } else { // Pokud kategorie neexistuje (monthSummary)
                    const newCat = {
                        categoryID,
                        total: numericAmount,
                        count: 1,
                        maxTransaction: {
                            title,
                            amount: numericAmount,
                            day,
                            year,
                            month,
                            transCategory,
                            createdAt: new Date(year, month, day)
                        }
                    }
                    monthSummary.expenseByCategory.push(newCat)
                }
            }

            await monthSummary.save()
            await yearSummary.save()

            return res.status(200).json({ errCode: 5001 })
        }


        if (isCurrentMonth) {
            await Transaction.create({
                title, amount, category: categoryID, year, month, day, transCategory,
                createdBy: user._id
            })
            return res.status(200).json({ errCode: 5001 })

        } else {

            let summary = await MonthSummary.findOne({ month, year, createdBy: user._id })

            if (!summary) {
                await createMonthlySummary(userID, month, year)
            }
            summary = await MonthSummary.findOne({ month, year, createdBy: user._id })

            const numericAmount = Number(amount)
            // const isIncome = transCategory === 'income'


            // Expense
            if(!isIncome) {
                summary.totalExpense += numericAmount

                let findCat = summary.expenseByCategory.find(x => x.categoryID.toString() === categoryID)

                if(!findCat) {
                    // POKUD KATEGORIE NEEXTISTUJE, VYTVOŘIT
                    findCat = {
                        categoryID,
                        total: numericAmount,
                        count: 1,
                        maxTransaction: {
                            title,
                            amount: numericAmount,
                            day,
                            month,
                            year,
                            transCategory,
                            createdAt: new Date(year, month, day)
                        }
                    }

                    summary.expenseByCategory.push(findCat)

                } else { // POKUD KATEGORIE existuje, připočítat výdaj
                    findCat.total += numericAmount
                    findCat.count += 1

                    if(findCat.maxTransaction.amount < numericAmount) {
                        findCat.maxTransaction.amount = numericAmount
                        findCat.maxTransaction.title  = title
                        findCat.maxTransaction.day    = day
                        findCat.maxTransaction.year   = year
                        findCat.maxTransaction.month  = month
                        findCat.maxTransaction.transCategory = transCategory
                        findCat.maxTransaction.createdAt = new Date(year, month, day)
                    }
                }
            }

            // INCOME
            if(isIncome) {
                summary.totalIncome += numericAmount

                let findCat = summary.incomeByCategory.find(x => x.categoryID.toString() === categoryID)

                if(!findCat) {
                    // POKUD KATEGORIE NEEXTISTUJE, VYTVOŘIT
                    findCat = {
                        categoryID,
                        total: numericAmount,
                        count: 1,
                        maxTransaction: {
                            title,
                            amount: numericAmount,
                            day,
                            month,
                            year,
                            transCategory,
                            createdAt: new Date(year, month, day)
                        }
                    }

                    summary.incomeByCategory.push(findCat)

                } else { // POKUD KATEGORIE existuje, připočítat výdaj
                    findCat.total += numericAmount
                    findCat.count += 1

                    if(findCat.maxTransaction.amount < numericAmount) {
                        findCat.maxTransaction.amount = numericAmount
                        findCat.maxTransaction.title  = title
                        findCat.maxTransaction.day    = day
                        findCat.maxTransaction.year   = year
                        findCat.maxTransaction.month  = month
                        findCat.maxTransaction.transCategory = transCategory
                        findCat.maxTransaction.createdAt = new Date(year, month, day)
                    }
                }
            }

            await summary.save()
        }

        return res.status(200).json({ errCode: 5001 })

    } catch (error) {
        console.log("newTransaction() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }

}

module.exports = { newTransaction }
