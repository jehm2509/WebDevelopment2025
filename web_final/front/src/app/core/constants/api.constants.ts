import { environment } from "./environments"


export const API_URL = {

    LOGIN: `${environment.apiBaseUrl}/api/login`,
    REGISTER: `${environment.apiBaseUrl}/api/user`,
    
    // contacts
    GET_CONTACTS: `${environment.apiBaseUrl}/api/contacts`,
    CREATE_CONTACT: `${environment.apiBaseUrl}/api/contact`,
    UPDATE_CONTACT: `${environment.apiBaseUrl}/api/contact`,
    DELETE_CONTACT: `${environment.apiBaseUrl}/api/contact`,

    
}


export const STATUS_CODES = {
    SUCCESS: 200,
    ERROR: 500,
    VALIDATION_FAIL: 400,
    UNAUTHORIZED: 401,
    FORBIDEN: 403,
}