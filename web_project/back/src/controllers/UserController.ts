import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import User from "@/models/User";
import { generateToken } from "@/helpers/Auth";
import { generateCustomToken, validateCusotomToken } from "@/helpers/TokenGenerator";
import { sendEmail } from "@/helpers/SendEmail";

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
            let salt = bcryptjs.genSaltSync();
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

export function updateUser(request: Request, response: Response) {

    let userParams = request.body;

    User.findById(userParams._id).then(
        (findUser: any) => {

            // validate if changed password
            if (findUser.password != userParams.password) {

                let salt = bcryptjs.genSaltSync();
                userParams.password = bcryptjs.hashSync(userParams.password, salt);

            }

            let user = new User(userParams);

            User.findByIdAndUpdate(userParams._id, user, { new: true }).then(
                (editedUser) => {
                    response.status(200).send({
                        message: "User was edited successfully",
                        user: editedUser
                    });
                },
                (err) => {
                    response.status(500).send({
                        message: 'An error ocurred while editing the user',
                        error: err
                    });
                }
            );

        },
        (err) => {
            response.status(500).send({
                message: 'An error ocurred while editing the user',
                error: err
            });
        }
    );
}


export function listUsers(request: Request, response: Response) {

    let filters = {};

    User.find(filters).then(
        (foundUsers) => {
            response.status(200).send(foundUsers);
        },
        err => {
            response.status(500).send({ message: "Error getting users" });
        }
    );

}


export function deleteUser(request: Request, response: Response) {
    let userId = request.params._id;
    User.findById(userId).then(
        (foundUser) => {
            foundUser?.softDelete();
            response.status(200).send({ message: "User deleted!" });
        },
        err => {
            response.status(500).send({ message: "Error deleting user" });
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

export function sendForgotPasswordEmail(request: Request, response: Response) {
    const forgotPasswordParams = request.body;

    let filters = {
        username: forgotPasswordParams.email
    }

    User.findOne(filters).then(
        async (userFound: any) => {
            if (userFound == null) {
                response.status(200).send({ message: 'If have an account an email sent' });
                return;
            }

            // generate a custom token
            let _token = generateCustomToken(userFound.username);

            // save generated token
            userFound.recovery_password = _token;
            await userFound.save();

            // // save generated token for recovery password
            // User.updateOne({_id: userFound._id}, {recovery_password: _token});

            // send email with recovery password link
            let _htmlContent = `Recovery Token: ${_token}`;
            sendEmail(userFound.username, 'Recovery Password', _htmlContent);

            response.status(200).send({ message: 'If have an account an email sent' });

        },
        err => {
            response.status(500).send({ message: 'An error ocurred while validating the user', error: err });
        }
    );
}

export function saveForgotPassword(request: Request, response: Response) {
    const saveForgotPasswordParams = request.body;

    let filters = {
        recovery_password: saveForgotPasswordParams.token
    }

    User.findOne(filters).then(
        async (userFound: any) => {
            if (userFound == null) {
                response.status(200).send({ message: 'Invalid token' });
                return;
            }

            // generate a custom token
            let _data = validateCusotomToken(userFound.recovery_password);

            // if token is valid, search user and change password
            if (!_data.success) {
                response.status(200).send({ message: 'Invalid token' });
                return;
            }


            // remove token to invalidate
            userFound.recovery_password = null;

            // save new password
            let salt = bcryptjs.genSaltSync();
            userFound.password = bcryptjs.hashSync(saveForgotPasswordParams.new_password, salt);

            // save user data
            await userFound.save();


            response.status(200).send({ message: 'Password changed!' });


        },
        err => {
            response.status(500).send({ message: 'An error ocurred while validating the user', error: err });
        }
    );
}