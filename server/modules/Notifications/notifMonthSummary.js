const Notification = require("../../models/Notification")

const NOTIF_TYPE_REGISTRATION = "MonthlySummary"

const msgCS_1 = "Podívejte se, jak se vám minulý měsíc dařilo spravovat své finance. Prohlédněte si své výdaje, porovnejte je s plánovaným rozpočtem a zjistěte, kde můžete ušetřit. 🎯"
const msgEN_1 = "Take a look at how you managed your finances last month. Review your expenses, compare them to your planned budget, and discover where you can save. 🎯"

const notifMonthSummary = async(month, year, userID, totalSpent, totalPlanned, categorySummary, unplannedCategories) => {

    try {
        
        await Notification.create({
            userID: userID,
            type: NOTIF_TYPE_REGISTRATION,
            titleCS: `Vaše měsíční shrnutí je tady! (${month}/${year})`,
            titleEN: `Your monthly summary is here! (${month}/${year})`,
            messageCS: [msgCS_1],
            messageEN: [msgEN_1],
            totalSpent,
            totalPlanned,
            month,
            year,
            categorySummary, // Porovnání plánovaných útrat vs skutečných útrat
            unplannedCategories // Neplánované útráty (kategori, které nejsou v budgetu pro daný měsíc) a mají kladné hodnoty amount.
        })

    } catch (error) {
        console.log("notifMonthSummary() => : ", error)
    }

}

module.exports = { notifMonthSummary }