import express from 'express';
import bodyParser from 'body-parser';
import healthCheckRoutes from '@/routes/HealthCheckRoutes';
import userRoutes from '@/routes/UserRoutes';
import productRoutes from '@/routes/ProductRoutes';

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use(healthCheckRoutes);
app.use(userRoutes);
app.use(productRoutes);

export default app;