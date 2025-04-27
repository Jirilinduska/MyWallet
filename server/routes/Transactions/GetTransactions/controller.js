const User = require("../../../models/User")
const Transaction = require("../../../models/Transaction")
const { groupByCategory } = require("../../../modules/Categories/GroupByCategory")


const getTransaction = async(req,res) => {

    const { month, year, transCategory} = req.params 
    const userID = req.user.userID

    try {
        
        const user = await User.findById(userID)
        
        const transactions = await Transaction.find({ 
            createdBy: user._id, month, year, transCategory 
        }).sort({ day: -1 })

        const totalPrice = transactions.reduce(( a, b ) => a + b.amount, 0)
        const graphData = groupByCategory(transactions)
        graphData.sort(( a, b ) => b.total - a.total)

        return res.status(200).json({ transactions, graphData, totalPrice })

    } catch (error) {
        console.log("newTransaction() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }

}


module.exports = { getTransaction }