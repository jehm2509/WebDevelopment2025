
import { getCurrentCompany } from "@/helpers/Auth";
import Service from "@/models/Service";
import { Request, Response } from "express";

export function createService(request: Request, response: Response) {
    let serviceParams = request.body;

    // get the current company
    serviceParams.company = getCurrentCompany(request);

    let newService = new Service(serviceParams);
    newService.save().then(
        (serviceSaved) => {
            response.status(200).send({
                message: 'Service created successfully',
                service: serviceSaved
            });
        },
        err => {
            response.status(500).send({
                message: 'An error ocurred while creating the service',
                err
            });
        }
    );
}

export function updateService(request: Request, response: Response) {

    let serviceParams = request.body;

    let service = new Service(serviceParams);

    Service.findByIdAndUpdate(service._id, service, { new: true }).then(
        (editedService) => {
            response.status(200).send({
                message: "Service was edited successfully",
                service: editedService
            });
        },
        (err) => {
            response.status(500).send({
                message: 'An error ocurred while editing the service',
                error: err
            });
        }
    );
}

export function deleteService(request: Request, response: Response) {
    let serviceId = request.params._id;
    Service.findById(serviceId).then(
        (foundService) => {
            foundService?.softDelete();
            response.status(200).send({ message: "Service deleted!" });
        },
        err => {
            response.status(500).send({ message: "Error deleting course" });
        }
    );
}

export function listServices(request: Request, response: Response) {


    let filters = {};

    Service.find(filters).then(
        (foundServices) => {
            response.status(200).send(foundServices);
        },
        err => {
            response.status(500).send({ message: "Error getting companies" });
        }
    );



}