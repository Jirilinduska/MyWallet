const Category = require("../../../models/Category")
const User = require("../../../models/User")

const getCategories = async(req,res) => {

    const { categoryType } = req.params
    const userID = req.userID

    try {
        const user = await User.findOne(userID)

        const categories = await Category.find({
            createdBy: user._id,
            categoryType: categoryType
        })

        return res.status(200).json(categories)

    } catch (error) {
        console.log("getCategories() => : ", error)
        return res.status(500).json({ message: "Server error." })
    }

}

module.exports = { getCategories }