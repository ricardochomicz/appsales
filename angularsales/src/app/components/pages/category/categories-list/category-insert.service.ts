import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { CategoriesListComponent } from "./categories-list.component";

@Injectable({
    providedIn: 'root'
})
export class CategoryInsertService {

    private _categoryListComponent: CategoriesListComponent

    constructor(private toastr: ToastrService) { }

    set categoryListComponent(value: CategoriesListComponent) {
        this._categoryListComponent = value
    }

    showModalInsert() {
        this._categoryListComponent.categoryNew.showModal()
    }

    onInsertSuccess(event: any) {
        this.toastr.success('Categoria Cadastrada com sucesso!')
        this._categoryListComponent.getCategories();
    }

    onInsertError(event: HttpErrorResponse) {
        this.toastr.error(`Erro ao criar categoria (Cód.${event.status} - ${event.statusText})`)
        console.log(event)
    }

}