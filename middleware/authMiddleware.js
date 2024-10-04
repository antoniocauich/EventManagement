import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verificar el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Obtener el usuario del token
      req.user = await User.findByPk(decoded.id, {
        attributes: ["id", "name", "role"],
      });

      next();
    } catch (error) {
      return res.status(401).json({ message: "No autorizado" });
    }
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "No autorizado, no se encontró token" });
  }
};
