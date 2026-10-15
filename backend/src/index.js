import express from 'express';
import cors from 'cors';
import routes from './routes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS: allow local dev origins and handle preflight explicitly
const corsOptions = {
	origin: (origin, callback) => callback(null, true), // reflect origin, allow all in dev
	credentials: false,
	methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log('Backend listening on http://localhost:'+PORT));
