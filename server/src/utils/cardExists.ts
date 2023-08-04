import { Card } from "../models/index.js"

export const cardExists = async (cardNumber = '') => {
  try {
    const card = await Card.findOne({ where: { cardNumber }})
    if (!card) throw new Error(`Card with number: ${cardNumber} does not exist`)
  } catch (error) {
    throw new Error(error)
  }
}