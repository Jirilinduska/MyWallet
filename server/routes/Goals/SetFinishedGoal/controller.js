const Goal = require("../../../models/Goal")


const setFinishedGoal = async(req,res) => {

    const { id } = req.params

    try {
        
        const goal = await Goal.findById(id)

        goal.isFinished = true
        goal.finishedAt = new Date().toISOString()

        await goal.save()

        return res.status(200).json({ errCode: 5001})
    } catch (error) {
        console.log("setFinishedGoal() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }
}

module.exports = { setFinishedGoal }