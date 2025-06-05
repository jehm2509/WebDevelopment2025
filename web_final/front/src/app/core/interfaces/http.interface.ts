export interface ILoginResponse {
  message: string;
  token?: string;
}

export interface IRegisterResponse {
  message: string;
}

export interface IContact {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  deleted_at: string;
  createdAt: string;
  updatedAt: string;
  cellphone: string;
  phone: string;
  _user_id: string;
}

export interface IContactResponse{
  message?: string;
  contacts?: IContact[];
}

export interface ISaveContactResponse{
  message: string;
  contact: IContact;
}

export interface IDeleteContactResponse{
  message: string;
}