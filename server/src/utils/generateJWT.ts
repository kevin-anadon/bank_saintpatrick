import jwt from "jsonwebtoken"

export const generateJWT = async (userId: number) => {
  const payload = { userId }
  const secret = process.env.SECRETORPRIVATEKEY
  try {
    return jwt.sign(payload, secret, { expiresIn: "2h" })
  } catch (error) {
    throw new Error(error)
  }
}
