const User = require("../../../models/User")
const Transaction = require("../../../models/Transaction")


const newTransaction = async(req,res) => {

    const { title, amount, categoryID, year, month, day, transCategory } = req.body
    const userID = req.user.userID

    try {
        
        const user = await User.findById(userID)

        await Transaction.create({
            title, amount, category: categoryID, year, month, day, transCategory,
            createdBy: user._id
        })

        return res.status(200).json({ errCode: 5001 })

    } catch (error) {
        console.log("newTransaction() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }

}


module.exports = { newTransaction }