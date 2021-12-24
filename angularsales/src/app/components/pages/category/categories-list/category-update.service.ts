import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { CategoriesListComponent } from "./categories-list.component";


@Injectable({
    providedIn: 'root'
})

export class CategoryUpdateService {

    private _categoryListComponent: CategoriesListComponent

    constructor(private toastr: ToastrService) { }

    set categoryListComponent(value: CategoriesListComponent) {
        this._categoryListComponent = value
    }

    showModalEdit(categoryId: number) {
        this._categoryListComponent.categoryId = categoryId
        this._categoryListComponent.categoryEdit.showModal()
    }

    onEditSuccess(event: any) {
        this.toastr.success('Categoria atualizada com sucesso!')
        this._categoryListComponent.getCategories();
    }

    onEditError(event: HttpErrorResponse) {
        this.toastr.error(`Erro ao atualizar categoria (Cód.${event.status} - ${event.statusText})`)
        console.log(event)
    }

}