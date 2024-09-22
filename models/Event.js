import { DataTypes } from "sequelize";
import { conectionDB } from "../config/databases.js";
import { User } from "./User.js";

export const Event = conectionDB.define("Event", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

//relaciones entre el modelo Event y User
Event.belongsTo(User, { foreignKey: "userId", as: "creator" });
User.hasMany(Event, { foreignKey: "userId" });
