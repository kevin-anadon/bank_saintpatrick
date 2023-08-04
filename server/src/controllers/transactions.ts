import { Request , Response} from 'express';
import { Op } from 'sequelize';
import { sequelize } from '../config/mysql.js';

import { User, Card, Transaction } from "../models/index.js"

export const getTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const transactions = await Transaction.findAll({
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
        [Op.or]: [
          { sender_id: id },
          { recipient_id: id }
        ]    
      }
    })
    return res
      .status(200)
      .json(transactions)
  } catch (error) {
    res.status(503).send(error);
  }
}

export const createTransaction = async (req: Request, res: Response) => {
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

    if (amount > senderBalance) return res.status(400).json({ message: 'Insufficient balance for performing the transaction!' })

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
      .json({ senderId, senderBalance, recipientId, recipientCardNumber, amount, transactionDate, transaction, addAmount, removeAmount})
  } catch (error) {
    await transactionInstance.rollback()
    res.status(503).send(error);
  }
}