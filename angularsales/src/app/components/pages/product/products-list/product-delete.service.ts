import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ProductsListComponent } from "./products-list.component";

@Injectable({
    providedIn: 'root'
})

export class ProductDeleteService {

    private _productListComponent: ProductsListComponent

    constructor(private toastr: ToastrService) { }

    set productListComponent(value: ProductsListComponent) {
        this._productListComponent = value
    }

    showModalDelete(id: number) {
        this._productListComponent.productId = id
        this._productListComponent.productDelete.showModal()
    }

    onDeleteSuccess(e: any) {
        this.toastr.success('Produto deletado com sucesso!')
        this._productListComponent.getProducts()
    }

    onDeleteError(e: HttpErrorResponse) {
        this.toastr.error(`Erro ao deletar produto (Cód.${e.status} - ${e.statusText})`)
    }
}