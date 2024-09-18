import express from "express";
const router = express.Route();
import { register, login } from "../controllers/authcontroller.js";

//ruta register
router.post("/register", register);
//ruta login
router.post("/login", login);

export default router;
