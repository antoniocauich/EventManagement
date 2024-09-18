import express from "express";
import dotenv from "dotenv";
dotenv.config();
export const app = express();
import { User } from "./models/User.js";

//sincronizacion de modelos y tablas en la DB
try {
  await User.sync();
  console.log("Modelo User sincronizados correctamente.");
} catch (error) {
  console.log("Error al sincronizar los modelos: ", error);
}
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
