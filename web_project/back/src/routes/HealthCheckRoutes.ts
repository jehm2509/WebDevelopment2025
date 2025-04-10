import { healtCheck } from '@/controllers/HealthCheckController';
import express from 'express';

const healthCheckRoutes = express.Router();

healthCheckRoutes.post('/', healtCheck);

export default healthCheckRoutes;
