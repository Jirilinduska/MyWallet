const mongoose = require("mongoose")

const SettingsSchema = new mongoose.Schema({
    allowRegistration: { type: Boolean, default: false },
    isMaintenance: { type: Boolean, default: false },
})

module.exports = mongoose.model("Settings", SettingsSchema)