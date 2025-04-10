import express from 'express';
import bodyParser from 'body-parser';
import healthCheckRoutes from '@/routes/HealthCheckRoutes';
import userRoutes from '@/routes/UserRoutes';
import productRoutes from '@/routes/ProductRoutes';
import companyRoutes from './routes/CompanyRoutes';

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use(healthCheckRoutes);
app.use(userRoutes);
app.use(productRoutes);
app.use(companyRoutes);

export default app;