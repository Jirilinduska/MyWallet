const User = require("../../../models/User")
const Transaction = require("../../../models/Transaction")


const getTransaction = async(req,res) => {

    const { month, year, transCategory} = req.params 
    const userID = req.userID

    try {
        
        const user = await User.findOne(userID)

        // Veškeré transakce podle datumu
        const transactions = await Transaction.find({ month: month, year: year, createdBy: user._id, transCategory: transCategory })

        // Seskupit data pro graf
        const graphData = await Transaction.aggregate([
            { 
                $match: {
                    createdBy: user._id, 
                    month: parseInt(month), 
                    year: parseInt(year),
                    transCategory: transCategory,
                }
            }, 
            { 
                $group: { 
                    _id: "$category", 
                    totalAmount: { $sum: "$amount" } 
                }
            },
            { 
                $project: { 
                    category: "$_id", 
                    totalAmount: 1, 
                    _id: 0 
                }
            }
        ])

        const totalPrice = transactions.reduce((total, transaction) => total + transaction.amount, 0)

        // TODO - Propočítat tady total spendings a vrátít je zvlášt poli :) 

        return res.status(200).json({ transactions, graphData, totalPrice })

    } catch (error) {
        console.log("newTransaction() => : ", error)
        return res.status(500).json({ message: "Server error." })
    }

}


module.exports = { getTransaction }