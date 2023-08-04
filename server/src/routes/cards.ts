import { Router } from 'express'
import { check } from 'express-validator'

const router = Router()

// Validators
import { validateFields } from '../middlewares/validateFields.js'

// Routes
import { getBalance } from '../controllers/cards.js'

router.get('/:cardNumber', [
],getBalance)

export default router