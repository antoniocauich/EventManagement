import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  updateEvent,
} from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = Router();

//creacion evento
router.post("/create", protect, createEvent);

//obtener todos los eventos
router.get("/allevents", getAllEvents);

//eliminar evento
router.delete("/delete/:id", protect, deleteEvent);

//obtener evento por ID
router.get("/:id", getEventById);

//actualizar evento
router.put("/update/:id", protect, updateEvent);

export default router;
