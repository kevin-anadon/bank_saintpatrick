import bcrypt from 'bcryptjs';
import { Request , Response} from 'express';

type UserLogin = {
    cardNumber: number,
    password: number
}

export const login = (req: Request, res: Response) => { 
  const { cardNumber, password }: UserLogin = req.body;
  let iguales = false

  
  // Me fijo que cardNumber y pass sean iguales a los que están en la BD
  
  res.status(200).json({
      iguales
  });
}