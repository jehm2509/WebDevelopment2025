
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

export function deleteCompany(request: Request, response: Response) {
    var companyId = request.params._id;
    Company.findById(companyId).then(
        (foundCompany) => {
            foundCompany?.softDelete();
            response.status(200).send({ message: "Company deleted!" });
        },
        err => {
            response.status(500).send({ message: "Error getting course" });
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