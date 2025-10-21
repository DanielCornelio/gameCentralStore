import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import usuariosRoutes from './src/routes/usuarios.route.js'
import authRoutes from './src/routes/auth.route.js'
import juegosRoutes from './src/routes/juegos.route.js'
import favoritosRoutes from './src/routes/favoritos.route.js'
import carritoRoutes from './src/routes/carrito.route.js'
import perfilRoutes from './src/routes/perfil.route.js'
import ratingsRoutes from './src/routes/ratings.route.js'


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Central Game Store'});
})

app.use('/api', usuariosRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', juegosRoutes);
app.use('/api', favoritosRoutes);
app.use('/api', carritoRoutes);
app.use('/api', perfilRoutes);
app.use('/api', ratingsRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
