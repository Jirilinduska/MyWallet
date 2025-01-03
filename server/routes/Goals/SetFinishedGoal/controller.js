const Goal = require("../../../models/Goal")


const setFinishedGoal = async(req,res) => {

    const { id } = req.params

    try {
        
        const goal = await Goal.findById(id)

        if(!goal) return res.status(400).json({ message: "Goal not found" })

        goal.isFinished = true

        await goal.save()

        return res.status(200).json({ message: "Goal finished" })
    } catch (error) {
        console.log("setFinishedGoal() => : ", error)
        return res.status(500).json({ message: "Server error." })
    }
}

module.exports = { setFinishedGoal }