import { createCompany, deleteCompany, listCompanies } from '@/controllers/CompanyController';
import { validateRequest } from '@/middlewares/requestValidator';
import { CreateCompanyValidator, DeleteCompanyValidator, ListCompanyValidator } from '@/validators/CompanyValidators';
import express from 'express';

const companyRoutes = express.Router();

// list companies
companyRoutes.get('/api/companies', validateRequest(ListCompanyValidator), listCompanies);
// create company
companyRoutes.post('/api/company', validateRequest(CreateCompanyValidator), createCompany);
// delete company
companyRoutes.delete('/api/company/:_id', validateRequest(DeleteCompanyValidator), deleteCompany);

export default companyRoutes;
