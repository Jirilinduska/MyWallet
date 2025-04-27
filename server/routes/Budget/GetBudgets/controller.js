const User = require("../../../models/User")
const Budget = require("../../../models/Budget")

const getBudgets = async(req,res) => {

    const userID = req.user.userID
    
    try {

        const user = await User.findById(userID)

        const budgets = await Budget.find({ createdBy: user._id })
            .populate({
                path: 'budgetCategories.categoryID',
                select: 'name iconID'
        })

        return res.status(200).json(budgets)

    } catch (error) {
        console.log("getBudgets() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }

}

module.exports = { getBudgets }

