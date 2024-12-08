const Category = require("../../models/Category")


const createDefaultCategories = async(userID) => {

    try {

        const defaultCategories = [
            { name: "Food", iconID: 1, createdBy: userID, categoryType: "transaction" },
            { name: "Transport", iconID: 2, createdBy: userID, categoryType: "transaction"  },
            { name: "Entertainment", iconID: 3, createdBy: userID, categoryType: "transaction"  },
            { name: "Salary", iconID: 4, createdBy: userID, categoryType: "income" },
            { name: "Freelance", iconID: 5, createdBy: userID, categoryType: "income" },
            { name: "Other", iconID: 6, createdBy: userID, categoryType: "income" },
        ]

        await Category.insertMany(defaultCategories)

    } catch (error) {
        console.log("createDefaultCategories() => : ", error)
    }
}


module.exports = { createDefaultCategories }