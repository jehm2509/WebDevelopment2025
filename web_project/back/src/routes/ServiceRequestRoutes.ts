import { createServiceRequest, deleteServiceRequest, listServiceRequests, updateServiceRequest } from '@/controllers/ServiceRequestController';
import { validateRequest } from '@/middlewares/requestValidator';
import { CreateServiceRequestValidator, DeleteServiceRequestValidator, ListServiceRequestValidator, UpdateServiceRequestValidator } from '@/validators/ServiceRequestValidators';
import express from 'express';

const serviceRequestRoutes = express.Router();

// list service_requests
serviceRequestRoutes.get('/api/service_requests', validateRequest(ListServiceRequestValidator), listServiceRequests);
// create serviceRequest
serviceRequestRoutes.post('/api/service_request', validateRequest(CreateServiceRequestValidator), createServiceRequest);
// update serviceRequest
serviceRequestRoutes.patch('/api/service_request', validateRequest(UpdateServiceRequestValidator), updateServiceRequest);
// delete serviceRequest
serviceRequestRoutes.delete('/api/service_request/:_id', validateRequest(DeleteServiceRequestValidator), deleteServiceRequest);

export default serviceRequestRoutes;
