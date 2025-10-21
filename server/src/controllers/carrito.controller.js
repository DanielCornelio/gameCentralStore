import { createCartModel, getCartByEmailModel, clearCartByUserIdModel } from "../models/carrito.model.js";


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

export const clearCartByUserId = async (req, res) => {
    try {
        console.log(req)
        const { id } = req.params;
        console.log(req.params)
        if(!id) {
            res.status(400).json({ message: 'Bad Request. Faltan campos obligatorios'});
            return;
        }
        const carritoVacio = await clearCartByUserIdModel(id);
        if(carritoVacio === 0){
            res.status(404).json({ message: 'No se ha encontrado el carrito'});
            return;
        }
        res.status(200).json({ message: 'Se ha vaciado el carrito correctamente'});
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
        
    }
}