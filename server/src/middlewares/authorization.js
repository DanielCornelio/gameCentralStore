import jwt from 'jsonwebtoken';
import 'dotenv/config.js';

export const authorize = async (req, res, next) =>{
    try {
        const authHeader = req.header.authorization;
        if(!authHeader){
            return res.status(401).json({message: 'No se proporcionó cabecera de autenticación'});
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const {email, rol} = decoded;
        req.user = {email, rol};
        next();

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const verifyCredentials = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'El email y la contraseña son requeridos' });
    }
    next();
}