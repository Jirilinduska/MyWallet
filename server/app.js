const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./db/connect")
const { loadRoutes } = require("./libs/loadRoutes")
const path = require("path")
const cron = require("node-cron")
const cronMonthSummary = require("./cronjobs/cronMonthSummary/cronMonthSummary")

dotenv.config()

const port = process.env.PORT || 5009
const app = express()

app.use(express.json())


const allowedOrigins = [
    'http://localhost:3000', 
    'https://my-wallet-budget-app.vercel.app'
]


app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    methods: 'GET,POST,PUT,DELETE,PATCH',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))

loadRoutes(app, path.join(__dirname, 'routes'))

// * cron jobs:

// Každý den - 22:45
cron.schedule('45 22 * * *', async () => { 
    try {
        await cronMonthSummary()
    } catch (error) {
        console.log("Cron-job error: " + error)
    }
})

const startServer = async () => {
    try {
        await connectDB()
        app.listen(port, () => {
            console.log("Server is running on port " + port)
        })
    } catch (error) {
        console.log(error)
    }
}

startServer()

module.exports = app