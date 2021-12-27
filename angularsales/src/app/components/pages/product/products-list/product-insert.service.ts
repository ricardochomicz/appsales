import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ProductsListComponent } from "./products-list.component";

@Injectable({
    providedIn: 'root'
})

export class ProductInsertService {

    private _productListComponent: ProductsListComponent

    constructor(private toastr: ToastrService) { }

    set productListComponent(value: ProductsListComponent){
        this._productListComponent = value
    }

    showModalInsert(){
        this._productListComponent.productNew.showModal()
    }

    onInsertSuccess(event: any){
        this.toastr.success('Produto cadastrado com sucesso!')
        this._productListComponent.getProducts()
    }

    onInsertError(event: HttpErrorResponse){
        this.toastr.error(`Erro ao criar categoria (Cód.${event.status} - ${event.statusText})`)
    }
}