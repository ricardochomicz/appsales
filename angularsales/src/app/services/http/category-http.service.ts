import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Category } from 'src/app/models';
import { AuthService } from '../auth.service';
import { HttpResource, SearchParams, SearchParamsBuilder } from './http-resource';



@Injectable({
    providedIn: 'root'
})
export class CategoryHttpService implements HttpResource<Category> {

    private baseUrl = 'http://localhost:8000/api/categories'

    constructor(private http: HttpClient, private authService: AuthService) { }

    getAll(searchParams: SearchParams): Observable<{ data: Array<Category>, meta: any }> {
        const token = this.authService.getToken();
        const params = new HttpParams({
            fromObject:
                new SearchParamsBuilder(searchParams).makeObject()
        })
        return this.http.get<{ data: Array<Category>, meta: any }>(this.baseUrl, {
            params,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    get(id: number): Observable<Category> {
        const token = this.authService.getToken();
        return this.http.get<{ data: Category }>(`${this.baseUrl}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .pipe(map(response => response.data))
    }

    create(data: Category): Observable<Category> {
        const token = this.authService.getToken();
        return this.http.post<{ data: Category }>(this.baseUrl, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .pipe(map(response => response.data))
    }

    update(id: number, data: Category): Observable<Category> {
        const token = this.authService.getToken();
        return this.http.put<{ data: Category }>(`${this.baseUrl}/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .pipe(map(response => response.data))
    }

    destroy(id: number) {
        const token = this.authService.getToken();
        return this.http.delete<{ data: any }>(`${this.baseUrl}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

    }


}
