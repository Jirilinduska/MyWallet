const { default: mongoose } = require("mongoose")


const MonthSummarySchema = new mongoose.Schema(

  {
    month: { type: Number },
    year: { type: Number },
    totalIncome: { type: Number },
    totalExpense: { type: Number },

    incomeByCategory: [{ 
        categoryID: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, 
        total: { type: Number, default: 0 },
        count: { type: Number, default: 0 },
        maxTransaction: { 
          title: { type: String, default: '' },
          amount: { type: Number, default: 0 },
          day: { type: String, default: '' },
          year: { type: Number, default: 0 },
          month: { type: Number, default: 0 },
          transCategory: { type: String, default: '' },
          createdAt: { type: Date, default: Date.now }
        },
        planned: { type: Number, default: 0 }
      }],

    expenseByCategory: [{ 
        categoryID: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, 
        total: { type: Number, default: 0 },
        count: { type: Number, default: 0 },
        maxTransaction: { 
          title: { type: String, default: '' },
          amount: { type: Number, default: 0 },
          day: { type: String, default: '' },
          year: { type: Number, default: 0 },
          month: { type: Number, default: 0 },
          transCategory: { type: String, default: '' },
          createdAt: { type: Date, default: Date.now }
        },
        planned: { type: Number, default: 0 }
    }],


    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  }

)

module.exports = mongoose.model("MonthSummary", MonthSummarySchema)