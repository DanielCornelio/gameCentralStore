import bcrypt from "bcryptjs";
import pool from "../../db/config.js";


export const getUsersModel = async () =>{
    const querySQL = 'SELECT * FROM usuarios';
    const { rows: usuarios } = await pool.query(querySQL);
    return usuarios;
}

export const getUserByEmailModel = async (email) => {
    const querySQL = {
        text: 'SELECT * FROM usuarios WHERE email = $1',
        values: [email]
    }
    const { rows: usuario} = await pool.query(querySQL);
    return usuario[0];
}



export const createUserModel = async (email, password_hash) => {
    const hashedPassword = bcrypt.hashSync(password_hash, 10);
    const querySQL = {
        text: 'INSERT INTO usuarios (email, password_hash) VALUES ($1, $2) RETURNING id, email, rol, activo, fecha_creacion',
        values: [email, hashedPassword]
    }
    const { rows: nuevoUsuario } = await pool.query(querySQL);
    return nuevoUsuario;
} 

export const updateUserModel = async (email, password_hash, id) => {
    const hashedPassword = bcrypt.hashSync(password_hash, 10);
    const querySQL = {
        text: 'UPDATE usuarios SET email = $1, password_hash = $2 WHERE id = $3 RETURNING *',
        values: [email, hashedPassword, id]
    }
    const { rows: usuarioActualizado } = await pool.query(querySQL)
    return usuarioActualizado;
}

export const deleteUserModel = async (id) => {
    const querySQL = {
        text: 'DELETE FROM usuarios WHERE id = $1',
        values: [id]
    }
    const result = await pool.query(querySQL);
    const usuarioEliminado = result.rowCount;
    return usuarioEliminado;
}