const Category = require("../../../models/Category")


const updateCategory = async(req,res) => {

    const { id, name, iconID, categoryType } = req.body
    
    try {

        await Category.findOneAndUpdate(
            { _id: id },
            { $set: { categoryType: categoryType, iconID: iconID, name: name } },
            { new: true }
        )
    
        return res.status(200).json({ errCode: 5001 })

    } catch (error) {
        console.log("updateCategory() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }

}


module.exports = { updateCategory }