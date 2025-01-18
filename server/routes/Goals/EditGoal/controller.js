const Goal = require("../../../models/Goal")

const editGoal = async(req,res) => {

    const { id } = req.params
    const { goal } = req.body

    console.log("BODY: " + req.body)

    try {
        const findGoal = await Goal.findById(id)

        findGoal.title      = goal.title
        findGoal.amount     = goal.amount
        findGoal.year       = goal.year
        findGoal.isPriority = goal.isPriority
        findGoal.isFinished = goal.isFinished
        findGoal.note       = goal.note

        await findGoal.save()

        return res.status(200).json({ errCode: 5001 })

    } catch (error) {
        console.log("editGoal() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }
}

module.exports = { editGoal }