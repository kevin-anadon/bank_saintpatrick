import jwt from "jsonwebtoken"
import { Request , Response, NextFunction} from 'express';

import { User } from "../models/index.js"

interface DecodedTokenPayload {
  userId: number
}

export const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const secret = process.env.SECRETORPRIVATEKEY
  const token = req.header("auth-token")
  if (!token) return res.status(401).json({ msg: "There is not token in the request" })
  try {
    const decodedToken = jwt.verify(token, secret) as DecodedTokenPayload
    const user = await User.findByPk(decodedToken.userId)
    if (!user)
      return res
        .status(401)
        .json({ msg: "Token not valid - User does not exist" })
    next();
  } catch (error) {
    res.status(401).json({
      msg: "Token not valid",
    });
  }
}