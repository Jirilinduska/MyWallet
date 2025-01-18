const Budget = require("../../../models/Budget")

const deleteBudget = async(req,res) => {

    const { id } = req.params

    try {

        await Budget.findByIdAndDelete(id)

        return res.status(200).json({ errCode: 5001})

    } catch (error) {
        console.log("deleteBudget() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }
}


module.exports = { deleteBudget }