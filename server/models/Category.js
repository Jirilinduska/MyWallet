const { default: mongoose } = require("mongoose")

const CategorySchema = new mongoose.Schema({

    name: { type: String, required: true },

    iconID: { type: Number, required: true },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
})

module.exports = mongoose.model("Category", CategorySchema)