const Category = require("../../../models/Category")
const User = require("../../../models/User")

const newCategory = async(req,res) => {

    const { name, iconID, categoryType } = req.body
    const userID = req.user.userID
        
    try {

        const user = await User.findById(userID)

        const categories = await Category.findOne({
            name: name,
            createdBy: user._id
        })

        if(categories) return res.status(400).json({ errCode: 2002 })

        await Category.create({
            name: name,
            iconID: iconID,
            categoryType: categoryType,
            createdBy: user._id
        })

        return res.status(200).json({ errCode: 5001 })

    } catch (error) {
        console.log("newCategory() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }
}

module.exports = { newCategory }