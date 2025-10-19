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



export const createUserModel = async ({email, password_hash, username, nombre, apellido, pais,avatar_url,fecha_nacimiento}) => {
    const hashedPassword = bcrypt.hashSync(password_hash, 10);
    const querySQL = {
        text: 'INSERT INTO usuarios (email, password_hash, username, nombre, apellido, pais,avatar_url,fecha_nacimiento) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, email, rol, activo, username,nombre, apellido, pais, avatar_url, fecha_nacimiento, fecha_creacion',
        values: [email, hashedPassword,username, nombre, apellido, pais,avatar_url,fecha_nacimiento]
    }
    const { rows: nuevoUsuario } = await pool.query(querySQL);
    return nuevoUsuario;
} 

export const updatePasswordModel = async (password_hash, id) => {
    const hashedPassword = bcrypt.hashSync(password_hash, 10);
    const querySQL = {
        text: 'UPDATE usuarios SET password_hash = $1 WHERE id = $2 RETURNING *',
        values: [hashedPassword, id]
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