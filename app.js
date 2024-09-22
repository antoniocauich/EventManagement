import dotenv from "dotenv";
import express from "express";
export const app = express();
import { User } from "./models/User.js";
import { Event } from "./models/Event.js";
import authRoutes from "./routes/auth.js";
import eventRoutes from "./routes/event.js";
dotenv.config();

//sincronizacion de modelos y tablas en la DB
try {
  await User.sync();
  await Event.sync();
  console.log("Modelos sincronizados correctamente.");
} catch (error) {
  console.log("Error al sincronizar los modelos: ", error);
}

app.use(express.json());

//RUTAS DE LA APP
//rutas de autenticacion
app.use("/api/auth", authRoutes);

//rutas eventos
app.use("/api/event", eventRoutes);
