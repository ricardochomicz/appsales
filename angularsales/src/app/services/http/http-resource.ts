import { Observable } from "rxjs/internal/Observable";


export interface HttpResource<T> {
    
    getAll(page: number): Observable<{ data: Array<T>, meta: any }>

    get(id: number): Observable<T>

    create(data: T): Observable<T>

    update(id: number, data: T): Observable<T>

    destroy(id: number): Observable<any>


}