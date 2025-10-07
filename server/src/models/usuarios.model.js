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

export const createUserModel = async (username, email, password_hash) => {
    const hashedPassword = bcrypt.hashSync(password_hash, 10);
    const querySQL = {
        text: 'INSERT INTO usuarios (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
        values: [username, email, hashedPassword]
    }
    const { rows: nuevoUsuario } = await pool.query(querySQL);
    return nuevoUsuario;
} 