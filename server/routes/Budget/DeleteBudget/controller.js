const Budget = require("../../../models/Budget")

const deleteBudget = async(req,res) => {

    const { id } = req.params

    try {

        await Budget.findByIdAndDelete(id)

        return res.status(200).json({ message: "success" })

    } catch (error) {
        console.log("deleteBudget() => : ", error)
        return res.status(500).json({ message: "Server error." })
    }
}


module.exports = { deleteBudget }