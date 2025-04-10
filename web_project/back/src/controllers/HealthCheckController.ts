import { Request, Response } from "express";

export function healtCheck(request: Request, response: Response){
    response.status(200).send('Health Check');
}