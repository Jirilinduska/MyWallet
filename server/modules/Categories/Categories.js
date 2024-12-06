const Category = require("../../models/Category")


const createDefaultCategories = async(userID) => {

    try {

        const defaultCategories = [
            { name: "Food", iconID: 1, createdBy: userID},
            { name: "Transport", iconID: 2, createdBy: userID },
            { name: "Entertainment", iconID: 3, createdBy: userID },
        ]

        await Category.insertMany(defaultCategories)

    } catch (error) {
        console.log("createDefaultCategories() => : ", error)
    }
}


module.exports = { createDefaultCategories }