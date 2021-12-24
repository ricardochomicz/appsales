import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { CategoriesListComponent } from "./categories-list.component";

@Injectable({
    providedIn: 'root'
})

export class CategoryDeleteService {

    private _categoryListComponent: CategoriesListComponent

    constructor(private toastr: ToastrService) { }

    set categoryListComponent(value: CategoriesListComponent) {
        this._categoryListComponent = value
    }

    showModalDelete(categoryId: number) {
        this._categoryListComponent.categoryId = categoryId
        this._categoryListComponent.categoryDelete.showModal()
    }

    onDeleteSuccess(event: any) {
        this.toastr.success('Categoria deletada com sucesso!')
        this._categoryListComponent.getCategories()
    }

    onDeleteError(event: HttpErrorResponse) {
        this.toastr.error(`Erro ao deletar categoria (Cód.${event.status} - ${event.statusText})`)
        console.log(event)
    }

}