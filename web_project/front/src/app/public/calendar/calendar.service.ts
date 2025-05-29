import { API_URL } from "@/core/constants/api.constants";
import { IService, IServiceRequest } from "@/core/interfaces/http.interface";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class CalendarService {
    private tokenKey = 'token';

    constructor(private http: HttpClient) { }

    getServiceRequests():Observable<IServiceRequest[]> {
        return this.http.get<IServiceRequest[]>(API_URL.GET_SERVICE_REQUESTS);
    }

}
