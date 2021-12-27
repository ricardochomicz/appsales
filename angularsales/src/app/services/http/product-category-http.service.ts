import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ProductCategory } from 'src/app/models';
import { map } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class ProductCategoryHttpService {

    constructor(private http: HttpClient) { }

    getAll(productId: number): Observable<ProductCategory> {
        const token = window.localStorage.getItem('token')
        return this.http.get<{ data: ProductCategory }>(this.getBaseUrl(productId), {
            headers: { Authorization: `Bearer ${token}` }
        }).pipe(map(response => response.data))
    }

    create(productId: number, categoriesId: number[]): Observable<ProductCategory> {
        const token = window.localStorage.getItem('token')
        return this.http.post<{ data: ProductCategory }>(this.getBaseUrl(productId), { categories: categoriesId }, {
            headers: { Authorization: `Bearer ${token}` }
        }).pipe(map(response => response.data))
    }

    // @ts-ignore
    private getBaseUrl(productId: number, categoryId: number = null): string {
        let baseUrl = `http://localhost:8000/api/products/${productId}/categories`
        if (categoryId) {
            baseUrl += `/${categoryId}`
        }
        return baseUrl;
    }
}
