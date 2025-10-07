import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { getUserByEmailModel } from "../models/usuarios.model.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password_hash } = req.body;
    const user = await getUserByEmailModel(email);
    user[0]
    if (!user) {
      return res
        .status(404)
        .json({ message: "El usuario o la contraseña son incorrectos" });
    }

    const isPasswordValid = bcrypt.compareSync(password_hash, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "No autorizado" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};