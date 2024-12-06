const Transaction = require("../../../models/Transaction")


const updateTransaction = async(req,res) => {

    const { id, title, amount, category, year, month, day } = req.body

    try {

        await Transaction.findOneAndUpdate(
            { _id: id },
            { $set: { title, amount, category, year, month, day } }, 
            { new: true }
        )
    
        return res.status(200).json({ message: "Transaction updated." })

    } catch (error) {
        console.log("updateTransaction() => : ", error)
        return res.status(500).json({ message: "Server error." })
    }

}


module.exports = { updateTransaction }