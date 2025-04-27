const { default: mongoose } = require("mongoose")


const YearSummarySchema = new mongoose.Schema({
    
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
    }],


    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }



})

module.exports = mongoose.model("YearSummary", YearSummarySchema)