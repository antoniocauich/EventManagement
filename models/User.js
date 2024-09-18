import { DataTypes } from "sequelize";
import { conectionDB } from "../config/databases.js";

export const User = conectionDB.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "user", // por defecto será un usuario común
  },
});
