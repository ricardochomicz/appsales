import { Observable } from "rxjs/internal/Observable";

export interface SearchParams {
    page?: number,
    all?: any
}

export class SearchParamsBuilder {
    constructor(private searchParams: SearchParams) {
    }

    makeObject() {
        const sParams: any = {
            page: this.searchParams.page
        }
        if (this.searchParams.all) {
            sParams.all = true
            delete sParams.page
        }
        return sParams
    }
}

export interface HttpResource<T> {

    getAll(searchParams: SearchParams): Observable<{ data: Array<T>, meta: any }>

    get(id: number): Observable<T>

    create(data: T): Observable<T>

    update(id: number, data: T): Observable<T>

    destroy(id: number): Observable<any>


}