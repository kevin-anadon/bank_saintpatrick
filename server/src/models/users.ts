import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/index.js";

interface UserAttributes {
  id: number
  firstName: string
  lastName: string
}

export interface UserInstance extends Model<UserAttributes>, UserAttributes {}

export const User = sequelize.define<UserInstance>("user", 
  {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      }
  },
  { // Borrado logico
    timestamps: true,
    paranoid: true,
  }
)