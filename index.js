import { app } from "./app.js";
import { conectionDB } from "./config/databases.js";
import dotenv from "dotenv";
dotenv.config();

//verificacion coneccion DB
try {
  await conectionDB.authenticate();
  console.log("Conección a la DB realizada exitosamente!!");
} catch (error) {
  console.error("Error al conectarse a la DB:", error);
}

//inicializacion server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Aplicacion corriendo en http://localhost:${PORT}`);
});
