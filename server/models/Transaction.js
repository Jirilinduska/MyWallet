const { default: mongoose } = require("mongoose")

const TransactionSchema = new mongoose.Schema({

    title: { type: String, required: false },

    amount: { type: Number, required: true },

    category: { type: String, required: true },

    year: { type: Number, required: true },

    month: { type: Number, required: true },
    
    day: { type: Number, required: true },

})


module.exports = mongoose.model("Transaction", TransactionSchema)