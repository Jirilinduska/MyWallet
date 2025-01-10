const Budget = require("../../../models/Budget")

// Spouští se každý 1. den v měsíci v 00:01 h
const monthSummary = async(req,res) => {

    try {
        
        const today = new Date()
        const currentMonth = today.getMonth() + 1
        const currentYear = today.getFullYear()

        const outdatedBudgets = await Budget.find({
            $or: [
                { year: { $lt: currentYear } }, // Starší roky
                { year: currentYear, month: { $lt: currentMonth } }, // Starší měsíce v tomto roce
            ],
            isFinished: false, // Jen neukončené budgety
        })

        if (outdatedBudgets.length === 0) {
            console.log("Žádné staré budgety k označení.")
            return res.status(200).json({ message: "Žádné staré budgety k označení." })
        }

        // Aktualizujeme budgety na isFinished = true
        // TODO - Přidat notifikaci pro uživatele...
        // TODO - Přidat více funkcí - případně export data....
        const updatedBudgets = await Budget.updateMany(
            {
                _id: { $in: outdatedBudgets.map((budget) => budget._id) },
            },
            { $set: { isFinished: true } }
        )

        console.log(`Označeno ${updatedBudgets.modifiedCount} budgetů jako dokončené.`)
        return res.status(200).json({ message: `${updatedBudgets.modifiedCount} budgetů označeno jako dokončené.` })

    } catch (error) {
        console.error("Chyba při označování budgetů:", error);
        return res.status(500).json({ error: "Chyba při označování budgetů." })
    }

}


module.exports = { monthSummary }