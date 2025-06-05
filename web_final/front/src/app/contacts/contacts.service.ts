import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IContact, IContactResponse, IDeleteContactResponse, ISaveContactResponse,  } from '@/core/interfaces/http.interface';
import { API_URL } from '@/core/constants/api.constants';

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    constructor(private http: HttpClient) { }

    getContacts(): Observable<IContactResponse> {
        return this.http.get<IContactResponse>(API_URL.GET_CONTACTS);
    }

    createContact(contact: IContact):Observable<ISaveContactResponse>{
        return this.http.post<ISaveContactResponse>(API_URL.CREATE_CONTACT,contact);
    }

    updateContact(contact: IContact):Observable<ISaveContactResponse>{
        return this.http.patch<ISaveContactResponse>(API_URL.UPDATE_CONTACT,contact);
    }

    deleteContact(contact: IContact):Observable<IDeleteContactResponse>{
        return this.http.delete<IDeleteContactResponse>(`${API_URL.DELETE_CONTACT}/${contact._id}`);
    }
    

}
