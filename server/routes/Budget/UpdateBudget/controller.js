const Budget = require("../../../models/Budget")
const User = require("../../../models/User")

const updateBudget = async(req,res) => {

    const { _id, budgetCategories, month, year, totalPricePlanned } = req.body
    const userID = req.user.userID

    try {
        const user = await User.findById(userID)
        
        const findBudget = await Budget.findById(_id)

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

        return res.status(200).json({ errCode: 5001 })

    } catch (error) {
        console.log("updateBudget() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }

}

module.exports = { updateBudget }
