import bcrypt from 'bcryptjs';
import { Request , Response} from 'express';

import { User, Card } from '../models/index.js'
import { generateJWT, encrypt } from '../utils/index.js'

export const login = async (req: Request, res: Response) => { 
  const { cardNumber, pin }: { cardNumber: number, pin: string } = req.body;
  try {
    const card = await Card.findOne({ 
      where: {
        cardNumber: cardNumber,
      }
    })
    if (!card) {
      return res
        .status(400)
        .json({ msg: "Card with this number does not exists"})
    }
    const user = await User.findOne({
      where: {
        id: card.user_id
      }
    })

    if (!user) {
      return res
        .status(400)
        .json({ msg: "User not found with this card" 
      })
    }
    
    const validPin = bcrypt.compareSync(pin, card.pin)

    if (!validPin) {
      return res
        .status(400)
        .json({ msg: "Invalid pin" 
      })
    }

    const token = await generateJWT(user.id)

    res.status(200).json({
      card,
      user,
      token,
    })
  } catch (error) {
    throw Error(error)
  }
}