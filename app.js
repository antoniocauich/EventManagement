import dotenv from "dotenv";
import express from "express";
export const app = express();
import { User } from "./models/User.js";
import authRoutes from "./routes/auth.js";
dotenv.config();

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

//RUTAS DE LA APP
//rutas de autenticacion
app.use("/api/auth", authRoutes);
