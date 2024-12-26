const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./db/connect")
const { loadRoutes } = require("./libs/loadRoutes")
const path = require("path")

dotenv.config()
// const port = process.env.PORT
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