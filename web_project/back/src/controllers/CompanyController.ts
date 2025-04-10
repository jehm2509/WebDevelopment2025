
import Company from "@/models/Company";
import { Request, Response } from "express";

export function createCompany(request: Request, response: Response) {
    let companyParams = request.body;

    let newCompany = new Company(companyParams);
    newCompany.save().then(
        (companySaved) => {
            response.status(200).send({
                message: 'Company created successfully',
                company: companySaved
            });
        },
        err => {
            response.status(500).send({
                message: 'An error ocurred while creating the company'
            });
        }
    );
}

export function updateCompany(request: Request, response: Response) {

    let companyParams = request.body;

    let company = new Company(companyParams);

    Company.findByIdAndUpdate(company._id, company, { new: true }).then(
        (editedCompany) => {
            response.status(200).send({
                message: "Company was edited successfully",
                company: editedCompany
            });
        },
        (err) => {
            response.status(500).send({
                message: 'An error ocurred while editing the company',
                error: err
            });
        }
    );
}

export function deleteCompany(request: Request, response: Response) {
    let companyId = request.params._id;
    Company.findById(companyId).then(
        (foundCompany) => {
            foundCompany?.softDelete();
            response.status(200).send({ message: "Company deleted!" });
        },
        err => {
            response.status(500).send({ message: "Error deleting course" });
        }
    );
}

export function listCompanies(request: Request, response: Response) {


    let filters = {};

    Company.find(filters).then(
        (foundCompanies) => {
            response.status(200).send(foundCompanies);
        },
        err => {
            response.status(500).send({ message: "Error getting companies" });
        }
    );



}