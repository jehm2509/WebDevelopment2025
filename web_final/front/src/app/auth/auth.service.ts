import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILoginResponse, IRegisterResponse } from '@/core/interfaces/http.interface';
import { API_URL } from '@/core/constants/api.constants';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private tokenKey = 'token';

    constructor(private http: HttpClient) { }

    login(email: string, password: string): Observable<ILoginResponse> {
        return this.http.post<ILoginResponse>(API_URL.LOGIN, { username: email, password });
    }

    register(email: string, password: string): Observable<IRegisterResponse> {
        return this.http.post<IRegisterResponse>(API_URL.REGISTER, { username: email, password });
    }


    saveToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    logout(): void {
        localStorage.removeItem(this.tokenKey);
    }
}
