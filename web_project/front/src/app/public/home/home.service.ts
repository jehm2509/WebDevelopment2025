import { API_URL } from "@/core/constants/api.constants";
import { IService } from "@/core/interfaces/http.interface";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class HomeService {
    private tokenKey = 'token';

    constructor(private http: HttpClient) { }

    getServices():Observable<IService[]> {
        return this.http.get<IService[]>(API_URL.GET_SERVICES);
    }

}
