import { createUser, loginUser } from '@/controllers/UserController';
import { validateRequest } from '@/middlewares/requestValidator';
import { CreateUserValidator, LoginUserValidator } from '@/validators/UserValidators';
import express from 'express';

const userRoutes = express.Router();

userRoutes.post('/api/login', validateRequest(LoginUserValidator), loginUser);
// for test don't need jwt data
userRoutes.post('/api/user', validateRequest(CreateUserValidator), createUser);

export default userRoutes;