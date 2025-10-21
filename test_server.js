import express from 'express';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Test server working!' });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Test server is running on port ${PORT}`);
    console.log(`Try: http://localhost:${PORT}`);
});
