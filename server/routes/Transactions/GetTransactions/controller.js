const User = require("../../../models/User")
const Transaction = require("../../../models/Transaction")


const getTransaction = async(req,res) => {

    const { month, year } = req.params 
    const userID = req.userID

    try {
        
        // TODO usporadat strukturu na BE, ne na FE!
        const transactions = await Transaction.find({
            month: month,
            year: year
        })

        if (!transactions.length) {
            return res.status(404).json({ message: "No transactions found for the specified date." });
        }

        // TODO - Propočítat tady total spendings a vrátít je zvlášt poli :) 

        return res.status(200).json(transactions)

    } catch (error) {
        console.log("newTransaction() => : ", error)
        return res.status(500).json({ message: "Server error." })
    }

}


module.exports = { getTransaction }