import { Router } from 'express'
import { check } from 'express-validator'

const router = Router()

// Validators
import { validateFields } from '../middlewares/validateFields.js'

// Routes
import { getTransaction, createTransaction  } from '../controllers/transactions.js'

router.get('/:id', getTransaction)

router.post('/', [
  validateFields
], createTransaction)

export default router