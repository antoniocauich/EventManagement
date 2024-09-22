import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  updateEvent,
} from "../controllers/eventController.js";
const router = Router();

//creacion evento
router.post("/create", createEvent);

//obtener todos los eventos
router.get("/allevents", getAllEvents);

//eliminar evento
router.delete("/delete/:id", deleteEvent);

//obtener evento por ID
router.get("/:id", getEventById);

//actualizar evento
router.put("/update/:id", updateEvent);

export default router;
