import { createUser, deleteUser, listUsers, loginUser, saveForgotPassword, sendForgotPasswordEmail, updateUser } from '@/controllers/UserController';
import { validateRequest } from '@/middlewares/requestValidator';
import { CreateUserValidator, DeleteUserValidator, ForgotPasswordValidator, ListUserValidator, LoginUserValidator, SaveForgotPasswordValidator, UpdateUserValidator } from '@/validators/UserValidators';
import express from 'express';

const userRoutes = express.Router();

userRoutes.post('/api/login', validateRequest(LoginUserValidator), loginUser);

// list companies
userRoutes.get('/api/users', validateRequest(ListUserValidator), listUsers);

// create user
userRoutes.post('/api/user', validateRequest(CreateUserValidator), createUser);

// update user
userRoutes.patch('/api/user', validateRequest(UpdateUserValidator), updateUser);

// delete user
userRoutes.delete('/api/user/:_id', validateRequest(DeleteUserValidator), deleteUser);

// send forgot password
userRoutes.post('/api/forgot_password', validateRequest(ForgotPasswordValidator), sendForgotPasswordEmail);

// save new forgot password
userRoutes.patch('/api/forgot_password', validateRequest(SaveForgotPasswordValidator), saveForgotPassword);

export default userRoutes;