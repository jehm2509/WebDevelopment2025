import { createContact, deleteContact, listContacts, updateContact } from '@/controllers/ContactController';
import { validateRequest } from '@/middlewares/requestValidator';
import { CreateContactValidator, DeleteContactValidator, ListContactValidator, UpdateContactValidator } from '@/validators/ContactValidators';
import express from 'express';

const contactRoutes = express.Router();

// list contacts
contactRoutes.get('/api/contacts', validateRequest(ListContactValidator,true), listContacts);
// create contact
contactRoutes.post('/api/contact', validateRequest(CreateContactValidator,true), createContact);
// update contact
contactRoutes.patch('/api/contact', validateRequest(UpdateContactValidator,true), updateContact);
// delete contact
contactRoutes.delete('/api/contact/:_id', validateRequest(DeleteContactValidator,true), deleteContact);

export default contactRoutes;
