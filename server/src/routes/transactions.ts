import { Router } from 'express'
import { check } from 'express-validator'

const router = Router()

// Validators
import { validateFields, validateJWT } from '../middlewares/index.js'
import { userExistsId, cardExists } from '../utils/index.js'

// Routes
import { getTransaction, createTransaction  } from '../controllers/transactions.js'

router.get('/:id', [
  validateJWT,
  check("id").custom(userExistsId),
  validateFields
], getTransaction)

router.post('/', [
  validateJWT,
  check("senderId", "senderId is required").not().isEmpty(),
  check("senderCardNumber", "senderCardNumber is required").not().isEmpty(),
  check("recipientCardNumber", "recipientCardNumber is required").not().isEmpty(),
  check("amount", "amount is required").not().isEmpty(),
  check("senderId").custom(userExistsId),
  check("senderCardNumber").custom(cardExists),
  check("recipientCardNumber").custom(cardExists),
  validateFields
], createTransaction)

export default router