const User = require("../../../models/User")
const Transaction = require("../../../models/Transaction")


const newTransaction = async(req,res) => {

    const { title, amount, category, year, month, day, transCategory } = req.body
    const userID = req.userID

    try {
        
        const user = await User.findOne(userID)

        if(!user) return res.status(400).json({ message: "User not found." })

        await Transaction.create({
            title, amount, category, year, month, day, transCategory,
            createdBy: user._id
        })

        return res.status(200).json({ message: "Transaction created." })

    } catch (error) {
        console.log("newTransaction() => : ", error)
        return res.status(500).json({ message: "Server error." })
    }

}


module.exports = { newTransaction }