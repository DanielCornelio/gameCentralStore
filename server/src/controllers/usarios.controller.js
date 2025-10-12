import { getUsersModel, createUserModel, getUserByEmailModel, updateUserModel, deleteUserModel } from "../models/usuarios.model.js";

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

export const register = async (req, res) =>{
    try {
        const {email, password_hash} = req.body;
        if(!email || !password_hash){
            res.status(400).json({ message: 'Faltan datos obligatorios' })
            return;
        }
        const nuevoUsuario = await createUserModel(email, password_hash);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const updateUser = async (req, res) =>{
    try {
        const {id} = req.params;
        const {email: emailToken } = req.user;
        const {email, password_hash} = req.body;
        (!id) && res.status(400).json({message: 'Bad Request. Faltan campos obligatorios'});

        const usuarioLogueado = await getUserByEmailModel(emailToken)
        if(usuarioLogueado.id != id){
            return res.status(403).json({message: 'No tienes permisos para actualizar este usuario'});
        }

        const usuarioActualizado = await updateUserModel(email, password_hash, id);
        if(usuarioActualizado.lenght === 0){
            res.status(404).json({message: 'Usuario no encontrado'});
            return;
        }
        res.status(200).json(usuarioActualizado)

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const deleteUser = async (req, res) =>{
    try {
        const {id} = req.params;
        (!id) && res.status(400).json({message: 'Bad Request. Faltan campos obligatorios'});

        const usuarioEliminado = await deleteUserModel(id);
        if(usuarioEliminado === 0) {
            res.status(404).json({message: 'Usuario no encontrado'});
            return;
        }
        res.status(200).json({message:'Usuario eliminado correctamente'});
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
