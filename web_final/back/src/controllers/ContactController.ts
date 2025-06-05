
import { STATUS_CODES } from "@/constatns/constants";
import Contact, { IContact } from "@/models/Contact";
import { Request, Response } from "express";

interface IValidateContactRequest{
    _id: string;
    _user_id: string;
}


export function createContact(request: Request, response: Response) {
    let contactParams: IContact = request.body;

    let newContact = new Contact(contactParams);
    newContact.save().then(
        (contactSaved) => {
            response.status(STATUS_CODES.SUCCESS).send({
                message: 'Contact created successfully',
                contact: contactSaved
            });
        },
        err => {
            response.status(STATUS_CODES.ERROR).send({
                message: 'An error ocurred while creating the contact'
            });
        }
    );
}

export async function updateContact(request: Request, response: Response) {

    let validContact = await validateUsercontact(request.body);
    
    if (!validContact) {
        response.status(STATUS_CODES.FORBIDEN).send({
            message: "Unauthorized contact",
        });
        return;
    }
    
    let contactParams: IContact = request.body;
    let contact = new Contact(contactParams);

    Contact.findByIdAndUpdate(contact._id, contact, { new: true }).then(
        (editedContact) => {
            response.status(STATUS_CODES.SUCCESS).send({
                message: "Contact was edited successfully",
                contact: editedContact
            });
        },
        (err) => {
            response.status(STATUS_CODES.ERROR).send({
                message: 'An error ocurred while editing the contact',
                error: err
            });
        }
    );
}

export async function deleteContact(request: Request, response: Response) {
    
    let validatecontactParams = {
        _id: request.params._id,
        ...request.body
    }
    let validContact = await validateUsercontact(validatecontactParams);
    
    if (!validContact) {
        response.status(STATUS_CODES.FORBIDEN).send({
            message: "Unauthorized contact",
        });
        return;
    }
    
    let contactId = request.params._id;
    Contact.findById(contactId).then(
        (foundContact) => {
            foundContact?.softDelete();
            response.status(STATUS_CODES.SUCCESS).send({ message: "Contact deleted!" });
        },
        err => {
            response.status(STATUS_CODES.ERROR).send({ message: "Error deleting course" });
        }
    );
}

export function listContacts(request: Request, response: Response) {

    let filters = getContactFilters(request.body);
    
    Contact.find(filters).then(
        (foundContacts) => {
            response.status(STATUS_CODES.SUCCESS).send({
                contacts: foundContacts
            });
        },
        err => {
            response.status(STATUS_CODES.ERROR).send({ message: "Error getting contacts" });
        }
    );

}

async function validateUsercontact(data: IValidateContactRequest) {
  
    let _filters = {
        _id: data._id,
        _user_id: data._user_id
    }
    let searchContact: IContact[] = await Contact.find(_filters);

    return searchContact.length > 0;
}

function getContactFilters(data: IValidateContactRequest) {

    let filters = {
        _user_id: data._user_id
    };
    return filters;
}