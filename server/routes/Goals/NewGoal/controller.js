const Goal = require("../../../models/Goal")
const User = require("../../../models/User")

const newGoal = async(req,res) => {

    const { title, amount, year, isPriority, note } = req.body
    const userID = req.user.userID

    try {
        
        const user = await User.findById(userID)

        const newGoal = await Goal.create({ title, amount, year, isPriority, note, createdBy: user._id })

        if(!newGoal) return res.status(400).json({ message: "Error during creating goal...." })

        return res.status(200).json({ message: "Goal created" })

    } catch (error) {
        console.log("newGoal() => : ", error)
        return res.status(500).json({ message: "Server error." })
    }
}

module.exports = { newGoal }