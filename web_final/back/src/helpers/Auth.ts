
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
        iat: moment().unix(),
        exp: moment().add('5', 'minutes').unix()
    }

    return encode(payload, jwt_secret_key);
}

type ReturnValidatedToken = {
    success: boolean,
    userId?: string
}

export function validateToken(request: Request): ReturnValidatedToken {
    try {
        const jwt_secret_key = process.env.JWT_SECRET_KEY ?? '';
        let userToken = request.headers.authorization ?? '';
        let cleanToken = userToken?.replace('Bearer ', '') ?? '';
        let payload = decode(cleanToken, jwt_secret_key);
        return {
            success: true,
            userId: payload.sub
        }
    } catch (e) {
        console.log(e);
        return {
            success: false
        };
    }
}
