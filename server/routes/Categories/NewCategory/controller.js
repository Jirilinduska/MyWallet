const Category = require("../../../models/Category")
const User = require("../../../models/User")

const newCategory = async(req,res) => {

    const { name, iconID, categoryType } = req.body
    const userID = req.user.userID
        
    try {

        const user = await User.findById(userID)
        if(!user) return res.status(400).json({ message: "User not found" })

        await Category.create({
            name: name,
            iconID: iconID,
            categoryType: categoryType,
            createdBy: user._id
        })

        return res.status(200).json({ message: "Category created" })

    } catch (error) {
        console.log("newCategory() => : ", error)
        return res.status(500).json({ message: "Server error." })
    }
}

module.exports = { newCategory }