import { Request , Response} from 'express';
import { Op, col } from 'sequelize';
import { sequelize } from '../config/mysql.js';

import { TransactionInstance } from "../models/transactions.js"
import { User, Card, Transaction } from "../models/index.js"

export const getTransaction = async (req: Request, res: Response) => {
  try {
    const CURRENT_DATE = new Date()
    const { id } = req.params
    const thisMonth = req.query.thisMonth === 'true' || false

    const sentTransactions = await Transaction.findAll({
      attributes: ['id', 'amount', 'transaction_date'],
      include: [{
        model: User,
        as: 'sender',
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: User,
        as: 'recipient',
        attributes: ['id', 'firstName', 'lastName']
      },
    ],
      where: {
        sender_id: id,
        ...(thisMonth && {
          [Op.and]: [
            sequelize.where(sequelize.fn('MONTH', col('transaction_date')), CURRENT_DATE.getMonth()+1),
            sequelize.where(sequelize.fn('YEAR', col('transaction_date')), CURRENT_DATE.getFullYear()),
          ]
        })
      },
      order: [
        ['transaction_date', 'DESC']
      ]
    })

    const receivedTransactions = await Transaction.findAll({
      attributes: ['id', 'amount', 'transaction_date'],
      include: [{
        model: User,
        as: 'sender',
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: User,
        as: 'recipient',
        attributes: ['id', 'firstName', 'lastName']
      },
    ],
      where: {
        recipient_id: id,
        ...(thisMonth && {
          [Op.and]: [
            sequelize.where(sequelize.fn('MONTH', col('transaction_date')), CURRENT_DATE.getMonth()+1),
            sequelize.where(sequelize.fn('YEAR', col('transaction_date')), CURRENT_DATE.getFullYear()),
          ]
        })
      },
      order: [
        ['transaction_date', 'DESC']
      ]
    })

    // Function to add a boolean property 'isSent' to each transaction object
    const addIsSentProperty = (transactions: TransactionInstance[], isSent: boolean) => {
      return transactions.map((transaction) => ({
        ...transaction.toJSON(),
        isSent,
      }))
    }

    const modifiedSentTransactions = addIsSentProperty(sentTransactions, true)
    const modifiedReceivedTransactions = addIsSentProperty(receivedTransactions, false)

    const transactions = [...modifiedSentTransactions, ...modifiedReceivedTransactions].sort(
      (a, b) => new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime()
    )

    return res
      .status(200)
      .json(transactions)
  } catch (error) {
    res.status(503).send(error);
  }
}

export const createTransaction = async (req: Request, res: Response) => {
  if (req.body.senderCardNumber === req.body.recipientCardNumber) {
    return res.status(400).json({ msg: 'You cannot make a transaction to the same card!'}) 
  } else if (req.body.amount <= 0) {
    return res.status(400).json({ msg: 'The balance must be positive!'}) 
  }
  const transactionInstance = await sequelize.transaction()

  try {
    const { senderId, senderCardNumber, recipientCardNumber, amount }: 
      { senderId: number, senderCardNumber: string, recipientCardNumber: string, amount: number } = req.body;
    const transactionDate = new Date()

    const { balance: senderBalance } = await Card.findOne({
      attributes: ['balance'],
      where: {
        cardNumber: senderCardNumber
      }
    })

    if (amount > senderBalance) return res.status(400).json({ msg: 'Insufficient balance for performing that transaction!' })

    const recipientCard = await Card.findOne({
      attributes: ['user_id', 'balance'],
      where: {
        cardNumber: recipientCardNumber
      }
    })

    const { user_id: recipientId, balance: recipientBalance } = recipientCard

    const transaction = await Transaction.create({
      sender_id: senderId,
      recipient_id: recipientId,
      amount,
      transaction_date: transactionDate
    }, { transaction: transactionInstance })

    // Making this trick to perform the decimal arithmetic
    const recipientNewBalance = ((recipientBalance * 10) + (amount * 10)) / 10

    const addAmount = await Card.update(
      {
        balance: recipientNewBalance
      },
      {
        where: { cardNumber: recipientCardNumber }
      }
    )

    const removeAmount = await Card.update(
      {
        balance: senderBalance - amount
      },
      {
        where: { cardNumber: senderCardNumber }
      }
    )

    await transactionInstance.commit()

    return res
      .status(200)
      .json({ msg: 'Transaction created successfully!' })
  } catch (error) {
    await transactionInstance.rollback()
    res.status(503).send(error);
  }
}