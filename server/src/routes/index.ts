import express from "express"
import fs from "fs"
import {dirname} from "path"
import { fileURLToPath } from "url"

import { removeExtension } from "../utils/removeExtension.js";

// Initialize
const router = express.Router()
const __dirname = dirname(fileURLToPath(import.meta.url))
const PATH_ROUTES = __dirname

// Dynamic routes
fs.readdirSync(PATH_ROUTES).filter((file) => {
  const name = removeExtension(file)
  if (name !== "index") {
    import(`./${file}`).then((module) => {
      router.use(`/${name}`, module.default)
    })
  }
})

export default router