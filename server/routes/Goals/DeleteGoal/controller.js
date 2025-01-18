const Goal = require("../../../models/Goal")


const deleteGoal = async(req,res) => {

    const { id } = req.params
    
    try {
        
        await Goal.findByIdAndDelete(id)

        return res.status(200).json({ errCode: 5001 })
        
    } catch (error) {
        console.log("deleteGoal() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }
}

module.exports = { deleteGoal }