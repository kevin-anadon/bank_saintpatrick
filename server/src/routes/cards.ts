import { Router } from 'express'
import { check } from 'express-validator'

const router = Router()

// Validators
import { validateFields, validateJWT } from '../middlewares/index.js'

// Routes
import { getBalance,  } from '../controllers/cards.js'

router.get('/:cardNumber', [
  validateJWT,
  check("cardNumber", "Card number is required").not().isEmpty(),
  validateFields
],getBalance)

export default router