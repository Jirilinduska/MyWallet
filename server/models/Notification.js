const mongoose = require("mongoose")

const TYPE_1 = "Registration"
const TYPE_2 = "MonthlySummary"
const TYPE_3 = "Test"


const NotificationSchema = new mongoose.Schema({

  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  type: {
    type: String,
    enum: [TYPE_1, TYPE_2, TYPE_3],
    required: true,
  },

  titleCS: {
    type: String,
    required: true,
  },

  titleEN: {
    type: String,
    required: true,
  },

  messageCS: {
    type: [String],
    required: true,
  },

  messageEN: {
    type: [String],
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  isRead: {
    type: Boolean,
    default: false,
  },

  isArchived: {
    type: Boolean,
    default: false,
  },

  // TYPE_2
  totalSpent: {
    type: Number,
    required: false
  },

  // TYPE_2
  totalPlanned: {
    type: Number,
    required: false
  },

  year: {
    type: Number,
    required: false
  },

  month: {
    type: Number,
    required: false
  }, 

  categorySummary: {
    type: [
        {
            categoryID: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, 
            planned: { type: Number, default: 0 }, 
            spent: { type: Number, default: 0 }
        }
    ],
    default: undefined,
  },

  unplannedCategories: {
    type: [
        {
            categoryID: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, 
            planned: { type: Number, default: 0 }, 
            spent: { type: Number, default: 0 }
        }
    ],
    default: undefined,
  }

});

module.exports = mongoose.model("Notification", NotificationSchema);
