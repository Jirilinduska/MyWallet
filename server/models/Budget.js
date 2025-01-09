const { default: mongoose } = require("mongoose")

const BudgetSchema = new mongoose.Schema({

    month: { type: Number, required: true },

    year: { type: Number, required: true },

    budgetCategories: [
        {
            categoryID: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
            price: { type: Number, required: true }
        }
    ],

    isFinished: { type: Boolean, default: false },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
})

module.exports = mongoose.model("Budget", BudgetSchema)