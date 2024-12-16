const User = require("../../../models/User")
const Transaction = require("../../../models/Transaction")


const deleteTransaction = async(req,res) => {

    const { id } = req.params 
    const userID = req.userID

    try {
        
        const transaction = await Transaction.findByIdAndDelete(id)

        return res.status(200).json(transaction)

    } catch (error) {
        console.log("deleteTransaction() => : ", error)
        return res.status(500).json({ message: "Server error." })
    }

}


module.exports = { deleteTransaction }