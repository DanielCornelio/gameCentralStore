import { createCartModel, getCartByEmailModel } from "../models/carrito.model";


export const getCartByEmail = async (req, res) => {
    try {
        const {email} = req.user;
        const carrito = await getCartByEmailModel(email);
        res.status(200).json({results:carrito});
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
        
    }
}

export const createCart = async (req, res) => {
    try {
        const { usuario_id, juego_id, cantidad } = req.body;
        const nuevoCarrito = await createCartModel({usuario_id, juego_id, cantidad});
        res.status(201).json(nuevoCarrito);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
