import express from 'express';
import type { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

export default app;

