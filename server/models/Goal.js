const { default: mongoose } = require("mongoose")


const GoalSchema = new mongoose.Schema(

  {
    title: { type: String, required: true },

    amount: { type: Number, required: true },

    year: { type: Number, required: true },

    isPriority: { type: Boolean, required: true },

    isFinished: { type: Boolean, required: false },

    note: { type: String, required: false },

    finishedAt: { type: String, default: null },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  }

)

module.exports = mongoose.model("Goal", GoalSchema)