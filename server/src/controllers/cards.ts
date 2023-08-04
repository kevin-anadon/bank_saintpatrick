import { Request , Response} from 'express';

import { Card } from "../models/index.js"

export const getBalance = async (req: Request, res: Response) => { 
  const cardNumber = req.params.cardNumber
  if (!cardNumber) {
    return res
      .status(400)
      .json({ msg: "You must pass the card number"})
  }
  try {
    const cardBalance = await Card.findOne(
      { 
      attributes: ['balance'],
      where: {
        cardNumber,
      }
    })
    if (!cardBalance) {
      return res
        .status(400)
        .json({ msg: "Card with this number does not exists"})
    }

    res.status(200).json({
      balance: cardBalance.balance
    })
  } catch (error) {
    throw Error(error)
  }
}