const { default: mongoose } = require("mongoose")

const UserChema = new mongoose.Schema({

    userName: { type: String, required: true },

    email: {
        type: String,
        required: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide valid email"
        ],
        unique: true,
    },

    password: {
        type: String,
        required: true,
        // TODO minLength: 8,
    },

    utils: {
        currency: { type: String, default: "$" },
        language: { type: String, default: "EN" },
        avatarID: { type: Number, default: 6 }
    },

    settings: {

        profileCompleted: { type: Boolean, default: false },
        emailConfirmed: { type: Boolean, default: false },
        resetPasswordToken: { type: String, default: null },
        resetPasswordExpires: { type: Date, default: null },
        canBeDeleted: { type: Boolean, default: true },
    }
})


module.exports = mongoose.model("User", UserChema)