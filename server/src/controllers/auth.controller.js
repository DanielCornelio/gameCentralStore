import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { getUserByEmailModel, createUserModel } from "../models/usuarios.model.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
   const userResult = await getUserByEmailModel(email);
const user = userResult[0];
if (!user) {
      return res
        .status(404)
        .json({ message: "El usuario o la contraseña son incorrectos" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(404).json({ message: "El usuario o la contraseña son incorrectos" });
    }

    const token = jwt.sign({ email, rol:user.rol }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    
    delete user.password_hash;

    return res.status(200).json({ token, user});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const registerUser = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    
    
    if (!nombre || !email || !password) {
      return res.status(400).json({ 
        error: 'Todos los campos son obligatorios' 
      });
    }

    
    const existingUserResult = await getUserByEmailModel(email);
const existingUser = existingUserResult[0];
if (existingUser) {
      return res.status(409).json({ 
        error: 'El email ya está registrado' 
      });
    }

    
    const newUser = await createUserModel({ nombre, email, password });
    
    
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      user: {
        id: newUser.id,
        nombre: newUser.nombre,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error('Error en registerUser:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

