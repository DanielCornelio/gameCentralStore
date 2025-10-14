import { getMeModel } from "../models/perfil.model.js";


export const getMe = async (req, res) => {
    try {
        const { email } = req.user;
        const perfil = await getMeModel(email);
        res.status(200).json({result:perfil})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}