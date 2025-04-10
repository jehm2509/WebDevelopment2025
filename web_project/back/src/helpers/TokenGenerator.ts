import moment from "moment";
import { decode, encode } from 'jwt-simple';


export function generateCustomToken(data: any) {
    const jwt_secret_key = process.env.JWT_RECOVERY_PASS_KEY ?? '';
    var payload = {
        data: data,
        iat: moment().unix(),
        exp: moment().add('60', 'minutes').unix()
    }

    return encode(payload, jwt_secret_key);
}

type ReturnValidatedToken = {
    success: boolean,
    data?: any
}

export function validateCusotomToken(token: string): ReturnValidatedToken {
    try {
        const jwt_secret_key = process.env.JWT_RECOVERY_PASS_KEY ?? '';
        
        let payload = decode(token, jwt_secret_key);
        return {
            success: true,
            data: payload.data,
        }
    } catch (e) {
        console.log(e);
        return {
            success: false
        };
    }
}