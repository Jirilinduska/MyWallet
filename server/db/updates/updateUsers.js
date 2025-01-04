const mongoose = require("mongoose")
const User = require("../../models/User")

// Přidání hodnot k USER modelu do databáze. (node updateUsers.js)

const updateUsers = async () => {

  try {

    const mongoURI = process.env.MONGO_URI

    console.log("mongoURI: ", mongoURI)

    await mongoose.connect(mongoURI)

    const result = await User.updateMany(
        {}, // Filtr - všechny dokumenty
        {
          $set: {
            "settings.resetPasswordToken": null,
            "settings.resetPasswordExpires": null,
          },
        }
      )

    console.log(`Updated ${result.modifiedCount} users.`)

    mongoose.connection.close()
  } catch (error) {
    console.error("updateUsers() => : ", error)
    mongoose.connection.close()
  }
}

updateUsers()
