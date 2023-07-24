import { Router } from 'express'
import { check } from 'express-validator'

const router = Router()

// Validators
import { validateFields } from '../middlewares/validateFields.js'

// Routes
import { login } from '../controllers/login.js'

router.post('/', [
  check("cardNumber", "Card number is required").not().isEmpty(),
  check("password", "Password is required").not().isEmpty(),
  validateFields
],login)

export default router