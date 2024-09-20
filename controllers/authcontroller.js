import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

//Register
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

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

//Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existUser = await User.findOne({ where: { email } }); //buscar existencia de usuario

    if (!existUser) {
      return res
        .status(400)
        .json({ message: "Correo o contraseña incorrecta" });
    }

    const comparePassword = await bcrypt.compare(password, existUser.password);

    if (!comparePassword) {
      return res
        .status(400)
        .json({ message: "Correo o contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: existUser.id, name: existUser.name, email: existUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login correcto. Bienvenido!!", token });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};
