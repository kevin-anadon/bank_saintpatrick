import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/index.js"

interface CardAttributes {
  id: number
  user_id: number
  cardNumber: string
  pin: string
  balance: number
}

interface CardInstance extends Model<CardAttributes>, CardAttributes {}

export const Card = sequelize.define<CardInstance>("card", 
  {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cardNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      pin: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      balance: {
        type: DataTypes.DECIMAL,
      },
  },
  { // Borrado logico
    timestamps: true,
    paranoid: true,
  }
)