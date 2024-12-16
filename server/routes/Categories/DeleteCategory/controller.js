const Category = require("../../../models/Category")


const deleteCategory = async(req,res) => {

    const { id } = req.params
    
    try {

        const category = await Category.findByIdAndDelete(id)

        if(!category) return res.status(400).json({ message: "Category not found." })

        return res.status(200).json({ message: "Category deleted." })

    } catch (error) {
        console.log("deleteCategory() => : ", error)
        return res.status(500).json({ message: "Server error." })
    }

}


module.exports = { deleteCategory }