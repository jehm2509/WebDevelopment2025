import express from 'express';
import bodyParser from 'body-parser';
import healthCheckRoutes from '@/routes/HealthCheckRoutes';
import userRoutes from '@/routes/UserRoutes';
import companyRoutes from '@/routes/CompanyRoutes';
import serviceRoutes from '@/routes/ServiceRoutes';
import serviceRequestRoutes from '@/routes/ServiceRequestRoutes';
import cors from 'cors';
const app = express();

// use cors
app.use(cors());

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use(healthCheckRoutes);
app.use(userRoutes);
app.use(companyRoutes);
app.use(serviceRoutes);
app.use(serviceRequestRoutes);

export default app;