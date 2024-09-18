import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

//variables de entorno de la DB
const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;

export const conectionDB = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "mysql",
});
