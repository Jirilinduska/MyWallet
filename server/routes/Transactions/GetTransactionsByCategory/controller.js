
const Transaction = require("../../../models/Transaction")
const User = require("../../../models/User")

const getTransactionsByCategory = async(req,res) => {

    const { categoryID } = req.params
    const userID = req.user.userID

    try {

        const user = await User.findById(userID)

        const transactions = await Transaction.find({
            createdBy: user._id,
            category: categoryID
        }).sort({ year: -1, month: -1, day: -1 })

        return res.status(200).json(transactions)

    } catch (error) {
        console.log("getTransactionsByCategory() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }
}

module.exports = { getTransactionsByCategory }



