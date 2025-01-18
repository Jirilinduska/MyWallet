const Category = require("../../../models/Category")
const Transaction = require("../../../models/Transaction")
const Budget = require("../../../models/Budget")

const deleteCategory = async(req,res) => {

    const { id } = req.params
    
    try {

        const transactions = await Transaction.find({ category: id })

        if (transactions.length > 0) return res.status(400).json({ errCode: 2000 })
        
        const budget = await Budget.findOne({
          "budgetCategories.categoryID": id
        })

        if (budget) return res.status(400).json({ errCode: 2001 })

        await Category.findByIdAndDelete(id)

        return res.status(200).json({ errCode: 5001 })

    } catch (error) {
        console.log("deleteCategory() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }

}


module.exports = { deleteCategory }