import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_URL } from "../constants/api.constants";
import { IService } from "../interfaces/http.interface";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ServiceServices {

    constructor(private http: HttpClient) { }
    
    getServices():Observable<IService[]> {
        return this.http.get<IService[]>(API_URL.GET_SERVICES);
    }
}
