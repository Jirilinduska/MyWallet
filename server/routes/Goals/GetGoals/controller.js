const Goal = require("../../../models/Goal")
const User = require("../../../models/User")


const getGoals = async(req,res) => {

    const userID = req.user.userID

    try {
        
        const user = await User.findById(userID)

        const listOfGoals = await Goal.find({ createdBy: user._id }).sort({ isPriority: -1, year: 1 })

        return res.status(200).json(listOfGoals)

    } catch (error) {
        console.log("getGoals() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }
}

module.exports = { getGoals }