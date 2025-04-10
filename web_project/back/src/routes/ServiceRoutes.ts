import { createService, deleteService, listServices, updateService } from '@/controllers/ServiceController';
import { validateRequest } from '@/middlewares/requestValidator';
import { CreateServiceValidator, DeleteServiceValidator, ListServiceValidator, updateServiceValidator } from '@/validators/ServiceValidators';
import express from 'express';

const serviceRoutes = express.Router();

// list services
serviceRoutes.get('/api/services', validateRequest(ListServiceValidator), listServices);
// create service
serviceRoutes.post('/api/service', validateRequest(CreateServiceValidator), createService);
// update service
serviceRoutes.patch('/api/service', validateRequest(updateServiceValidator), updateService);
// delete service
serviceRoutes.delete('/api/service/:_id', validateRequest(DeleteServiceValidator), deleteService);

export default serviceRoutes;
