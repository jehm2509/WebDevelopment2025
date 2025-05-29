import { environment } from "./environments"


export const API_URL = {

    LOGIN: `${environment.apiBaseUrl}/api/login`,

    // public
    GET_SERVICES: `${environment.apiBaseUrl}/api/services`,
    GET_SERVICE_REQUESTS: `${environment.apiBaseUrl}/api/service_requests`,
}