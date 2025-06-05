import { STATUS_CODES } from "@/constatns/constants";
import { Request, Response } from "express";

export function healtCheck(request: Request, response: Response){
    response.status(STATUS_CODES.SUCCESS).send('Health Check');
}