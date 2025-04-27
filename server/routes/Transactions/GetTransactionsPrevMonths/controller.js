const User = require("../../../models/User")
const MonthSummaryModel = require("../../../models/MonthSummary")
const { createMonthlySummary } = require("../../../modules/MonthSummary/MonthlySummary")

const getTransactionsPrevMonths = async(req,res) => {

    const { month, year } = req.params
    const userID = req.user.userID

    try {

        const user = await User.findById(userID)

        let prevMonthData = await MonthSummaryModel.findOne({ month, year, createdBy: user._id })

        if(!prevMonthData) {
            const result = await createMonthlySummary(userID, month, year)
            if(result) {
                prevMonthData = await MonthSummaryModel.findOne({ month, year, createdBy: user._id })
            } else {
                return res.status(500).json({ errCode: 5000 })
            }
        }

        return res.status(200).json(prevMonthData)

    } catch (error) {
        console.log("getTransactionsPrevMonths() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }
}

module.exports = { getTransactionsPrevMonths }