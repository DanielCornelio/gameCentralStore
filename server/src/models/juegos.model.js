import pool from "../../db/config.js";
import format from "pg-format";

export const getGamesModel = async () =>{
    const querySQL = 'SELECT * FROM juegos';
    const { rows: juegos } = await pool.query(querySQL);
    return juegos;
}

// export const findGamesModel = async ({limit = 10, order_by = 'precio_ASC', page = 1, titulo, precio_max, precio_min, genero, plataforma}) => {
//     const querySQL = 'SELECT * FROM juegos';
//     let filtros = [];
//     (titulo) && filtros.push(`nombre ILIKE $${titulo.length}`)
//     (precio_max) && filtros.push(`precio <= ${precio_max}`);
//     (precio_min) && filtros.push(`precio >= ${precio_min}`);
//     (genero) && filtros.push(`genero = '${genero}'`);
//     (plataforma) && filtros.push(`plataforma = '${plataforma}'`);

//     const [attribute, direction] = order_by.split('_');
//     const offset = (page - 1) * limit;


//     if(filtros.length > 0){
//         filtros = filtros.join(' AND ');
//         format(querySQL += ` WHERE ${filtros} ORDER BY %s %s LIMIT %s OFFSET %s'`, attribute, direction, limit, offset);
//     }
//     const {rows : juegos} = await pool.query(querySQL);
//     return juegos;   
// }

export const findGamesModel = async ({
  limit = 10, 
  order_by = 'precio_ASC', 
  page = 1, 
  titulo, 
  precio_max, 
  precio_min, 
  genero, 
  plataforma
}) => {
  let querySQL = 'SELECT * FROM juegos';
  const params = [];
  const conditions = [];

  // Construir condiciones con parametrización segura
  if (titulo) {
    params.push(`%${titulo}%`);
    conditions.push(`titulo ILIKE $${params.length}`);
  }
  
  if (precio_max) {
    params.push(precio_max);
    conditions.push(`precio <= $${params.length}`);
  }
  
  if (precio_min) {
    params.push(precio_min);
    conditions.push(`precio >= $${params.length}`);
  }
  
  if (genero) {
    params.push(genero);
    conditions.push(`genero = $${params.length}`);
  }
  
  if (plataforma) {
    params.push(plataforma);
    conditions.push(`plataforma = $${params.length}`);
  }

  // Agregar WHERE si hay condiciones
  if (conditions.length > 0) {
    querySQL += ` WHERE ${conditions.join(' AND ')}`;
  }

  // Ordenamiento
  const [attribute, direction] = order_by.split('_');
  querySQL += ` ORDER BY ${attribute} ${direction}`;

  // Paginación
  const offset = (page - 1) * limit;
  params.push(limit, offset);
  querySQL += ` LIMIT $${params.length - 1} OFFSET $${params.length}`;

  const { rows: juegos } = await pool.query(querySQL, params);
  return juegos;
};

export const getGameByIdModel = async (id) =>{
    const querySQL = {
        text: "SELECT * FROM juegos WHERE id=$1",
        values: [id]
    }
    const {rows: juego} = await pool.query(querySQL);
    return juego;
}

export const createGameModel = async ({titulo, descripcion, precio, precio_descuento, desarrollador, fecha_lanzamiento, portada_url, genero, plataforma, edad_minima} ) => {
    const querySQL = {
        text: 'INSERT INTO juegos (titulo, descripcion, precio, precio_descuento, desarrollador, fecha_lanzamiento, portada_url, genero, plataforma, edad_minima) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
        values: [titulo, descripcion, precio, precio_descuento, desarrollador, fecha_lanzamiento, portada_url, genero, plataforma, edad_minima]
    }
    const { rows: nuevoJuego } = await pool.query(querySQL);
    return nuevoJuego;
} 

 export const updateGameModel = async ( {titulo, descripcion, precio, precio_descuento, desarrollador, fecha_lanzamiento, portada_url, genero, plataforma, edad_minima, id} ) => {
    const querySQL = {
        text: 'UPDATE juegos SET titulo=$1, descripcion=$2, precio=$3, precio_descuento=$4, desarrollador=$5, fecha_lanzamiento=$6, portada_url=$7, genero=$8, plataforma=$9, edad_minima=$10 WHERE id=$11 RETURNING *',
        values: [titulo, descripcion, precio, precio_descuento, desarrollador, fecha_lanzamiento, portada_url, genero, plataforma, edad_minima, id]
    }

    const { rows: juegoActualizado} = await pool.query(querySQL)
    return juegoActualizado;
}

export const deleteGameModel = async (id) => {
    const querySQL = {
        text: 'DELETE FROM juegos WHERE id=$1',
        values: [id]
    };
    const result = await pool.query(querySQL);
    return result.rowCount;
}