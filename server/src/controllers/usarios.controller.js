import { getUsersModel, createUserModel, getUserByEmailModel } from "../models/usuarios.model.js";

export const getAllUsers = async (req, res) =>{
    try {
        const usuarios = await getUsersModel();
        res.status(200).json({results:usuarios})
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const getUserByEmail = async (req, res) => {
    try {
        const user = await getUserByEmailModel(req.user);
        if(!user){
            return res.status(404).json({message: 'Usuario no encontrado'});
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const createUser = async (req, res) =>{
    try {
        const {username, email, password_hash} = req.body;
        if(!username || !email || !password_hash){
            res.status(400).json({ message: 'Faltan datos obligatorios' })
            return;
        }
        const nuevoUsuario = await createUserModel(username, email, password_hash);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}