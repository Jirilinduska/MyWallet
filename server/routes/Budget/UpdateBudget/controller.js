const Budget = require("../../../models/Budget")
const User = require("../../../models/User")

const updateBudget = async(req,res) => {

    const { _id, budgetCategories, month, year, totalPricePlanned } = req.body
    const userID = req.user.userID

    try {
        const user = await User.findById(userID)

        if (!user) {
            console.log("User not found")
            return res.status(404).json({ message: "User not found." })
        }
        

        const findBudget = await Budget.findById(_id)
        if (!findBudget) {
            console.log("Budget not found")
            return res.status(404).json({ message: "Budget not found." })
        }

        const formattedCategories = budgetCategories.map(item => {
            return {
                categoryID: item.category._id,
                price: item.price
            }
        })

        findBudget.budgetCategories = formattedCategories
        findBudget.month = month
        findBudget.year = year
        findBudget.createdBy = user._id

        await findBudget.save()

        return res.status(200).json({ message: "Budget updated." })

    } catch (error) {
        console.log("updateBudget() => : ", error)
        return res.status(500).json({ message: "Server error." })
    }

}

module.exports = { updateBudget }
