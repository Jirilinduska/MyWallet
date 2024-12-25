
const Transaction = require("../../../models/Transaction")
const User = require("../../../models/User")

const getTransactionsByCategory = async(req,res) => {

    const { categoryID } = req.params
    const userID = req.user.userID

    try {

        const user = await User.findById(userID)

        if(!user) return res.status(400).json({ message: "User not found" })

        const transactions = await Transaction.find({
            createdBy: user._id,
            category: categoryID
        }).sort({ year: -1, month: -1, day: -1 })

        if(transactions.length === 0) {
            return res.status(400).json({ message: "No transactions for this category" })
        }

        return res.status(200).json(transactions)

    } catch (error) {
        console.log("getTransactionsByCategory() => : ", error)
        return res.status(500).json({ message: "Server error." })
    }
}

module.exports = { getTransactionsByCategory }



