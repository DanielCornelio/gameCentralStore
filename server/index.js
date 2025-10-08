import express from 'express';
import cors from 'cors';      
import 'dotenv/config';


import authRoutes from './src/routes/auth.route.js'


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Central Game Store'});
})


app.use('/api', authRoutes);


app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Server listening on all interfaces`);
});