import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Category } from 'src/app/models';



@Injectable({
    providedIn: 'root'
})
export class CategoryHttpService {

    private baseUrl = 'http://localhost:8000/api/categories'

    constructor(private http: HttpClient) { }

    getAll(page: number): Observable<{ data: Array<Category>, meta: any }> {
        const token = window.localStorage.getItem('token')
        const params = new HttpParams({
            fromObject: {
                page
            }
        })
        return this.http.get<{ data: Array<Category>, meta:any }>(this.baseUrl, {
            params,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    get(id: number): Observable<Category> {
        const token = window.localStorage.getItem('token')
        return this.http.get<{ data: Category }>(`${this.baseUrl}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .pipe(map(response => response.data))
    }

    create(data: Category): Observable<Category> {
        const token = window.localStorage.getItem('token')
        return this.http.post<{ data: Category }>(this.baseUrl, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .pipe(map(response => response.data))
    }

    update(id: number, data: Category): Observable<Category> {
        const token = window.localStorage.getItem('token')
        return this.http.put<{ data: Category }>(`${this.baseUrl}/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .pipe(map(response => response.data))
    }

    destroy(id:number) {
        const token = window.localStorage.getItem('token')
        return this.http.delete<{ data: any }>(`${this.baseUrl}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            
    }


}
