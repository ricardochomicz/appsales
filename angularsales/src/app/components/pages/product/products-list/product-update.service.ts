import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ProductsListComponent } from "./products-list.component";

@Injectable({
    providedIn: 'root'
})

export class ProductUpdateService {

    private _productListComponent: ProductsListComponent

    constructor(private toastr: ToastrService) { }

    set productListComponent(value: ProductsListComponent) {
        this._productListComponent = value
    }

    showModalEdit(productId: number) {
        this._productListComponent.productId = productId
        this._productListComponent.productEdit.showModal()
    }

    onEditSuccess(e: any) {
        this.toastr.success('Produto atualizado com sucesso!')
        this._productListComponent.getProducts()
    }

    onEditError(e: HttpErrorResponse) {
        this.toastr.error(`Erro ao atualizar produto (Cód.${e.status} - ${e.statusText})`)
    }
}