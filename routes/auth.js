import { Router } from "express";
import { register, login } from "../controllers/authcontroller.js";
const router = Router();

//ruta register
router.post("/register", register);
//ruta login
router.post("/login", login);

export default router;
