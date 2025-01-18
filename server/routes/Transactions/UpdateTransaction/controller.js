const Transaction = require("../../../models/Transaction")


const updateTransaction = async(req,res) => {

    const { id, title, amount, categoryID, year, month, day } = req.body

    try {
        
        await Transaction.findOneAndUpdate(
            { _id: id },
            { $set: { title, amount, category: categoryID, year, month, day } }, 
            { new: true }
        )
    
        return res.status(200).json({ errCode: 5001 })

    } catch (error) {
        console.log("updateTransaction() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }

}


module.exports = { updateTransaction }