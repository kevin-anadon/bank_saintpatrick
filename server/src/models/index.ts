import { User } from "./users.js"
import { Card } from "./cards.js"
import { Transaction } from "./transactions.js"

User.hasMany(Card, {
  foreignKey: "user_id",
})

Card.belongsTo(User, {
  foreignKey: "user_id",
})

Transaction.belongsTo(User, {
  as: 'sender',
  foreignKey: "sender_id",
})

Transaction.belongsTo(User, {
  as: 'recipient',
  foreignKey: "recipient_id",
})

export {
  User,
  Card,
  Transaction
}