export interface ILogin {
  message: string;
  token?: string;
}

export interface IService {
  _id: string;
  name: string;
  description: string;
  duration: number;
  company: {
    _id: string;
    name: string;
  };
  users: { _id: string; name: string }[];
  deleted_at: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IServiceRequest {

  _id: string,
  client_name: string,
  client_email: string,
  client_phone: string,
  date: string,
  service: {
    _id: string,
    name: string,
    duration: number
  },
  company_id: string,
  user: {
    _id: string,
    name: string
  },
  status: string
}