const Goal = require("../../../models/Goal")
const User = require("../../../models/User")

const newGoal = async(req,res) => {

    const { title, amount, year, isPriority, note } = req.body
    const userID = req.user.userID

    try {
        
        const user = await User.findById(userID)

        await Goal.create({ title, amount, year, isPriority, note, createdBy: user._id })

        return res.status(200).json({ errCode: 5001 })

    } catch (error) {
        console.log("newGoal() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }
}

module.exports = { newGoal }