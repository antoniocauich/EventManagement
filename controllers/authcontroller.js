import bcrypt from "bcrypt";
import { User } from "../models/User.js";

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existUser = await User.findOne({ where: { email } }); //buscar existencia de usuario

    if (existUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); //hasheado password

    const UserNew = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
    });

    res.status(201).json({
      message: "Usuario registrado exitosamente!!",
    });
  } catch (error) {
    console.log("Error en el servidor");
  }
};

export const login = (req, res) => {
  //dsf
};
