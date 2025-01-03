const Goal = require("../../../models/Goal")


const deleteGoal = async(req,res) => {

    const { id } = req.params
    
    try {
        
        const goal = await Goal.findByIdAndDelete(id)

        if(!goal) return res.status(400).json({ message: "Goal not found" })

        return res.status(200).json({ message: "Goal deleted" })
    } catch (error) {
        console.log("deleteGoal() => : ", error)
        return res.status(500).json({ message: "Server error." })
    }
}

module.exports = { deleteGoal }