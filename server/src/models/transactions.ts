import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/index.js"

interface TransactionAttributes {
  id: number
  sender_id: number
  recipient_id: number
  amount: number
  transaction_date: Date
}

interface TransactionInstance extends Model<TransactionAttributes>, TransactionAttributes {}

export const Transaction = sequelize.define<TransactionInstance>("card", 
  {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      recipient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      transaction_date: {
        type: DataTypes.DATE,
        allowNull: false,
      }
  }
)