import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import usuariosRoutes from './src/routes/usuarios.route.js'
import juegosRoutes from './src/routes/juegos.route.js'
import favoritosRoutes from './src/routes/favoritos.route.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Central Game Store'});
})

app.use('/api', usuariosRoutes);
app.use('/api', juegosRoutes);
app.use('/api', favoritosRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
