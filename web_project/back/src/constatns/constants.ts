export const ROLES = ["administrator", "company_user" ,"general_user"] as const;
export const SERVICE_REQUEST_STATUS = ["requested","accepted","denied"] as const;
export const SERVICE_REQUEST_STATUS_POS = {
    REQUESTED: 0,
    ACCEPTED: 1,
    DENIED: 2
};