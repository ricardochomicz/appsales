import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { Product } from "src/app/models";
import { HttpResource } from "./http-resource";

@Injectable({
    providedIn: 'root'
})

export class ProductHttpService implements HttpResource<Product> {

    private baseURL = 'http://localhost:8000/api/products'
    private token = window.localStorage.getItem('token')

    constructor(private http: HttpClient) { }

    getAll(page: number): Observable<{ data: Array<Product>, meta: any }> {
        const params = new HttpParams({
            fromObject: {
                page
            }
        })
        return this.http.get<{ data: Array<Product>, meta: any }>(this.baseURL, {
            params,
            headers: { Authorization: `Bearer ${this.token}` }
        })
    }

    get(id: number): Observable<Product> {
        return this.http.get<{ data: Product }>(`${this.baseURL}/${id}`, {
            headers: { Authorization: `Bearer ${this.token}` }
        })
            .pipe(map(response => response.data))
    }

    create(data: Product): Observable<Product> {
        return this.http.post<{ data: Product }>(this.baseURL, data, {
            headers: { Authorization: `Bearer ${this.token}` }
        })
            .pipe(map(response => response.data))
    }

    update(id: number, data: Product): Observable<Product> {
        return this.http.put<{ data: Product }>(`${this.baseURL}/${id}`, data, {
            headers: { Authorization: `Bearer ${this.token}` }
        })
            .pipe(map(response => response.data))
    }

    destroy(id: number) {
        return this.http.delete(`${this.baseURL}/${id}`, {
            headers: { Authorization: `Bearer ${this.token}` }
        })
    }

}