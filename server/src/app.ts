import "dotenv/config.js"
import express from "express"
import cors from "cors"

import routes from "./routes/index.js"
import { PORT, dbConnect } from "./config/index.js"

// Intialize
const app = express()

// Settings
app.use(cors())
app.use(express.json())

// Routes
app.use("/api", routes)

// Listen
const server = app.listen(PORT)

// Database connection
dbConnect()

export {
  app,
  server
}