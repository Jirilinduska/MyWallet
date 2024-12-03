const { default: mongoose } = require("mongoose")

const UserChema = new mongoose.Schema({

    userName: {
        type: String,
        required: true,
        unique: true
    },

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
        // minLength: 8,
    }
})


module.exports = mongoose.model("User", UserChema)