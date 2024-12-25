const User = require("../../../models/User")
const Transaction = require("../../../models/Transaction")
const { countTotalPrice } = require("../../../libs/countTotalPrice")


const getTransaction = async(req,res) => {

    const { month, year, transCategory} = req.params 
    const userID = req.user.userID

    try {
        
        const user = await User.findById(userID)

        // Veškeré transakce podle datumu
        const transactions = await Transaction.find({ 
            createdBy: user._id, month, year, transCategory 
        }).sort({ day: 1 })

        // Seskupit data pro graf
        const graphData = await Transaction.aggregate([
            {
              $match: {
                year: parseInt(year),
                month: parseInt(month),
                createdBy: user._id,
                transCategory: transCategory
              }
            },
            {
              $group: {
                _id: "$category",
                totalAmount: { $sum: "$amount" }
              }
            },
            {
              $sort: { totalAmount: -1 }
            },
            {
              $lookup: {
                from: 'categories', 
                let: { category_id: { $toObjectId: "$_id" } }, 
                pipeline: [
                  {
                    $match: {
                      $expr: { $eq: ["$_id", "$$category_id"] } 
                    }
                  }
                ],
                as: 'categoryDetails'
              }
            },
            {
              $unwind: "$categoryDetails"
            },
            {
              $project: {
                _id: 1,
                totalAmount: 1,
                categoryName: "$categoryDetails.name",
                categoryIconID: "$categoryDetails.iconID"
              }
            }
        ])

        const totalPrice = countTotalPrice(transactions)

        return res.status(200).json({ transactions, graphData, totalPrice })

    } catch (error) {
        console.log("newTransaction() => : ", error)
        return res.status(500).json({ message: "Server error." })
    }

}


module.exports = { getTransaction }