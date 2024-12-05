const { default: mongoose } = require("mongoose")

const TransactionSchema = new mongoose.Schema({

    title: { type: String, required: false },

    amount: { type: Number, required: true },

    category: { type: String, required: true },

    // TODO - Month, year.
    // year: { type: String, required: true },
    // month: { type: String, required: true },
    // day: { type: String, required: true },

})


module.exports = mongoose.model("Transaction", TransactionSchema)