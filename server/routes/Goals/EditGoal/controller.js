const Goal = require("../../../models/Goal")

const editGoal = async(req,res) => {

    const { id } = req.params
    const { goal } = req.body

    console.log("BODY: " + req.body)

    try {
        const findGoal = await Goal.findById(id)

        if(!findGoal) return res.status(400).json({ message: "Goal not found" })

        findGoal.title      = goal.title
        findGoal.amount     = goal.amount
        findGoal.year       = goal.year
        findGoal.isPriority = goal.isPriority
        findGoal.isFinished = goal.isFinished
        findGoal.note       = goal.note

        await findGoal.save()

        return res.status(200).json({ message: "Goal updated" })

    } catch (error) {
        console.log("editGoal() => : ", error)
        return res.status(500).json({ message: "Server error." })
    }
}

module.exports = { editGoal }