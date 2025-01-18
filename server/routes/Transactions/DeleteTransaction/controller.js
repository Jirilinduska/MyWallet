const User = require("../../../models/User")
const Transaction = require("../../../models/Transaction")


const deleteTransaction = async(req,res) => {

    const { id } = req.params 

    try {
        const transaction = await Transaction.findByIdAndDelete(id)

        return res.status(200).json(transaction)

    } catch (error) {
        console.log("deleteTransaction() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }

}


module.exports = { deleteTransaction }