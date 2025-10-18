import {
  getRatingsModel,
  createRatingsModel,
} from "../models/ratings.model.js";
import { getUserByEmailModel } from "../models/usuarios.model.js";

export const getRatings = async (req, res) => {
  try {
    const { juego_id } = req.params;
    const comentarios = await getRatingsModel(juego_id);

    res.status(200).json({ results: comentarios });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const createRatings = async (req, res) => {
  try {
    const { juego_id, usuario_id, calificacion, titulo, comentario } = req.body;
    const nuevoComentario = await createRatingsModel({
      juego_id,
      usuario_id,
      calificacion,
      titulo,
      comentario,
    });
    res.status(201).json(nuevoComentario);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
