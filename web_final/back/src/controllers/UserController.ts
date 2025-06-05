import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import User from "@/models/User";
import { generateToken } from "@/helpers/Auth";
import { STATUS_CODES } from "@/constatns/constants";

export function createUser(request: Request, response: Response) {

    let userParams = request.body;


    // validate if user already exist

    let filters = {
        username: userParams.username
    }

    User.findOne(filters).then(
        (userFound) => {
            if (userFound) {
                response.status(STATUS_CODES.VALIDATION_FAIL).send({ message: 'User already exist' });
                return;
            }

            // generate password
            let salt = bcryptjs.genSaltSync();
            userParams.password = bcryptjs.hashSync(userParams.password, salt);

            const newUser = new User(userParams);

            newUser.save().then(
                (userSaved) => {
                    response.status(STATUS_CODES.SUCCESS).send({
                        message: 'User created successfully'
                    });
                },
                err => {
                    response.status(STATUS_CODES.ERROR).send({
                        message: 'An error ocurred while creating the user'
                    });
                }
            );

        },
        err => {
            response.status(STATUS_CODES.ERROR).send({ message: 'An error ocurred while create the user', error: err });
        }
    );

}

export function listUsers(request: Request, response: Response) {

    let filters = {};

    User.find(filters).then(
        (foundUsers) => {
            response.status(STATUS_CODES.SUCCESS).send(foundUsers);
        },
        err => {
            response.status(STATUS_CODES.ERROR).send({ message: "Error getting users" });
        }
    );

}



export function loginUser(request: Request, response: Response) {

    const loginParams = request.body;

    let filters = {
        username: loginParams.username
    }

    User.findOne(filters).then(
        (userFound: any) => {
            if (userFound == null) {
                response.status(STATUS_CODES.VALIDATION_FAIL).send({ message: 'Invalid login data' });
                return;
            }

            if (bcryptjs.compareSync(loginParams.password, userFound.password)) {

                response.status(STATUS_CODES.SUCCESS).send({
                    message: 'Login Success',
                    token: generateToken({
                        id: String(userFound._id),
                        username: userFound.username,
                        role: userFound.role
                    })
                });
            } else {
                response.status(STATUS_CODES.VALIDATION_FAIL).send({
                    message: 'Invalid login data'
                });
            }
        },
        err => {
            response.status(STATUS_CODES.ERROR).send({ message: 'An error ocurred while validating the user', error: err });
        }
    );
}
