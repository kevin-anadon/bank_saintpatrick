import "dotenv/config.js"
import express from "express"
import cors from "cors"

import routes from "./routes/index.js"
import { PORT } from "./config/consts.js"

// Intialize
const app = express()

// Settings
app.use(cors())
app.use(express.json())

// Routes
app.use("/api", routes)

// Listen
const server = app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}!`);
})

export {
  server
}
