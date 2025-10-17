import pool from "../../db/config.js";

export const getMeModel = async (email) =>{
    const querySQL = {
        text:`
        SELECT 
            p.id,
            u.email,
            u.rol,
            p.nombre,
            p.fecha_nacimiento,
            p.pais,
            p.avatar_url,
            p.username,
            p.apellido
        FROM 
            perfiles p
        LEFT JOIN
            usuarios u ON u.id = p.usuario_id
        WHERE 
            u.email = $1`,
        values: [email]
    }
    const {rows : perfil } = await pool.query(querySQL);
    return perfil
}