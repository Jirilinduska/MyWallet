const Category = require("../../../models/Category")
const User = require("../../../models/User")

const getCategories = async(req,res) => {

    const { categoryType } = req.params
    const userID = req.user.userID

    try {
        const user = await User.findById(userID)

        const categories = await Category.find({
            createdBy: user._id,
            categoryType: categoryType
        })

        return res.status(200).json(categories)

    } catch (error) {
        console.log("getCategories() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }

}

module.exports = { getCategories }