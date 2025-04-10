
import { Request } from 'express';
import { decode, encode } from 'jwt-simple';
import moment from 'moment';


type UserParamType = {
    id: string,
    username: string,
    role: string
}
export function generateToken(user: UserParamType) {
    const jwt_secret_key = process.env.JWT_SECRET_KEY ?? '';
    var payload = {
        sub: user.id,
        name: user.username,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add('60', 'minutes').unix()
    }

    return encode(payload, jwt_secret_key);
}

type ReturnValidatedToken = {
    success: boolean,
    userId?: string,
    role?: string
}

export function validateToken(request: Request): ReturnValidatedToken {
    try {
        const jwt_secret_key = process.env.JWT_SECRET_KEY ?? '';
        let userToken = request.headers.authorization ?? '';
        let cleanToken = userToken?.replace('Bearer ', '') ?? '';
        let payload = decode(cleanToken, jwt_secret_key);
        return {
            success: true,
            userId: payload.sub,
            role: payload.role
        }
    } catch (e) {
        console.log(e);
        return {
            success: false
        };
    }
}

type ReturnCompany = {
    _id: string,
    name: string
}
export function getCurrentCompany(request: Request): ReturnCompany{

    return {
        _id: "asdf",
        name: "company"
    };
}