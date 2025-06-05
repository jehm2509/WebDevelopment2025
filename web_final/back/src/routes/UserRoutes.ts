import { createUser, listUsers, loginUser } from '@/controllers/UserController';
import { validateRequest } from '@/middlewares/requestValidator';
import { CreateUserValidator, ListUserValidator, LoginUserValidator } from '@/validators/UserValidators';
import express from 'express';

const userRoutes = express.Router();

userRoutes.post('/api/login', validateRequest(LoginUserValidator), loginUser);

// list users
userRoutes.get('/api/users', validateRequest(ListUserValidator), listUsers);

// create user
userRoutes.post('/api/user', validateRequest(CreateUserValidator), createUser);


export default userRoutes;