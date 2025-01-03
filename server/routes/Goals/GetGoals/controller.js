const Goal = require("../../../models/Goal")
const User = require("../../../models/User")


const getGoals = async(req,res) => {

    const userID = req.user.userID

    try {
        
        const user = await User.findById(userID)

        // if(!user) return res.status(400).json({ message: "User not found" })

        const listOfGoals = await Goal.find({ createdBy: user._id }).sort({ isPriority: -1, year: 1 })

        // if(!listOfGoals) return res.status()

        return res.status(200).json(listOfGoals)

    } catch (error) {
        
    }
}

module.exports = { getGoals }