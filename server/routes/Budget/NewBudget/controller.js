const User = require("../../../models/User")
const Budget = require("../../../models/Budget")

const newBudget = async(req,res) => {

    const { month, year, budgetCategories } = req.body
    const userID = req.user.userID
    
    try {

        const user = await User.findById(userID)

        await Budget.create({
            budgetCategories,
            month,
            year,
            createdBy: user._id
        })

        return res.status(200).json({ errCode: 5001 })

    } catch (error) {
        console.log("newBudget() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }

}

module.exports = { newBudget }