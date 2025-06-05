import express from 'express';
import bodyParser from 'body-parser';
import healthCheckRoutes from '@/routes/HealthCheckRoutes';
import cors from 'cors';
import userRoutes from '@/routes/UserRoutes';
import contactRoutes from './routes/ContactRoutes';

// use cors
const app = express();


// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use(contactRoutes);
app.use(userRoutes);
app.use(healthCheckRoutes);


export default app;