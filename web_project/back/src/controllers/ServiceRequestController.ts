import { SERVICE_REQUEST_STATUS, SERVICE_REQUEST_STATUS_POS } from "@/constatns/constants";
import ServiceRequest from "@/models/ServiceRequest";
import { Request, Response } from "express";

export function createServiceRequest(request: Request, response: Response) {
    let serviceRequestParams = request.body;

    // asign service requdst
    serviceRequestParams.status = SERVICE_REQUEST_STATUS[SERVICE_REQUEST_STATUS_POS.REQUESTED];

    let newServiceRequest = new ServiceRequest(serviceRequestParams);
    newServiceRequest.save().then(
        (serviceRequestSaved) => {
            response.status(200).send({
                message: 'ServiceRequest created successfully',
                serviceRequest: serviceRequestSaved
            });
        },
        err => {
            response.status(500).send({
                message: 'An error ocurred while creating the serviceRequest'
            });
        }
    );
}

export function updateServiceRequest(request: Request, response: Response) {

    let serviceRequestParams = request.body;

    let serviceRequest = new ServiceRequest(serviceRequestParams);

    ServiceRequest.findByIdAndUpdate(serviceRequest._id, serviceRequest, { new: true }).then(
        (editedServiceRequest) => {
            response.status(200).send({
                message: "ServiceRequest was edited successfully"
            });
        },
        (err) => {
            response.status(500).send({
                message: 'An error ocurred while editing the serviceRequest',
                error: err
            });
        }
    );
}

export function deleteServiceRequest(request: Request, response: Response) {
    let serviceRequestId = request.params._id;
    ServiceRequest.findById(serviceRequestId).then(
        (foundServiceRequest) => {
            foundServiceRequest?.softDelete();
            response.status(200).send({ message: "ServiceRequest deleted!" });
        },
        err => {
            response.status(500).send({ message: "Error deleting course" });
        }
    );
}

export function listServiceRequests(request: Request, response: Response) {


    let filters = {};

    ServiceRequest.find(filters).then(
        (foundServiceRequests) => {
            response.status(200).send(foundServiceRequests);
        },
        err => {
            response.status(500).send({ message: "Error getting serviceRequests" });
        }
    );



}