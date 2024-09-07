// Dev Env
// import "dotenv/config.js"
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

try {
  // Listen
  app.listen(PORT)
  
  // Database connection
  dbConnect()
} catch (error) {
  console.error('Error starting the server: ', error.message)
}


export {
  app,
}