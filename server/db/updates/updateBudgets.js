const mongoose = require("mongoose")
const Budget = require("../../models/Budget")

// Přidání hodnot k BUDGET modelu do databáze.

const updateBudgets = async () => {

  try {

    const mongoURI = process.env.MONGO_URI
    
    await mongoose.connect(mongoURI)

    const result = await Budget.updateMany(
        {}, // Filtr - všechny dokumenty
        {
          $set: {
            isFinished: false,
          },
        }
      )

    console.log(`Updated ${result.modifiedCount} budgets.`)

    mongoose.connection.close()
  } catch (error) {
    console.error("updateUsers() => : ", error)
    mongoose.connection.close()
  }
}

updateBudgets()
