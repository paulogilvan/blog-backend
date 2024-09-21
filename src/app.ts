import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import postRoutes from './routes/postRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Conexão com o MongoDB
mongoose.connect(process.env.DATABASE_URL || 'mongodb://mongo:27017/blogdb')
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro de conexão com MongoDB:', err));

app.use(helmet());
app.use(express.json());

app.use('/api/posts', postRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});