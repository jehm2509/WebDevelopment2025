import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import User from "@/models/User";
import { generateToken } from "@/helpers/Auth";

export function createUser(request: Request, response: Response) {

    let userParams = request.body;


    // validate if user already exist

    let filters = {
        username: userParams.username
    }

    User.findOne(filters).then(
        (userFound) => {
            if (userFound) {
                response.status(401).send({ message: 'User already exist' });
                return;
            }

            // generate password
            var salt = bcryptjs.genSaltSync();
            userParams.password = bcryptjs.hashSync(userParams.password, salt);

            const newUser = new User(userParams);

            newUser.save().then(
                (userSaved) => {
                    response.status(200).send({
                        message: 'User created successfully'
                    });
                },
                err => {
                    response.status(500).send({
                        message: 'An error ocurred while creating the user'
                    });
                }
            );

        },
        err => {
            response.status(500).send({ message: 'An error ocurred while create the user', error: err });
        }
    );






}

export function loginUser(request: Request, response: Response) {

    const loginParams = request.body;

    let filters = {
        username: loginParams.username
    }

    User.findOne(filters).then(
        (userFound) => {
            if (userFound == null) {
                response.status(400).send({ message: 'Invalid login data' });
                return;
            }

            if (bcryptjs.compareSync(loginParams.password, userFound.password)) {

                response.status(200).send({
                    message: 'Login Success',
                    token: generateToken({
                        id: String(userFound._id),
                        username: userFound.username,
                        role: userFound.role
                    })
                });
            } else {
                response.status(400).send({
                    message: 'Invalid login data'
                });
            }
        },
        err => {
            response.status(500).send({ message: 'An error ocurred while validating the user', error: err });
        }
    );
}
