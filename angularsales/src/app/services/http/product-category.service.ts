import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ProductCategory } from 'src/app/models';
import { map } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class ProductCategoryService {

    constructor(private http: HttpClient) { }

    getAll(productId: number): Observable<ProductCategory> {
        const token = window.localStorage.getItem('token')
        return this.http.get<{ data: ProductCategory }>(`http://localhost:8000/api/product/${productId}/categories`, {
            headers: { Authorization: `Bearer ${token}` }
        }).pipe(map(response => response.data))
    }
}
