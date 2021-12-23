import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryDeleteComponent } from '../category-delete/category-delete.component';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { CategoryNewComponent } from '../category-new/category-new.component';


@Component({
    selector: 'categories-list',
    templateUrl: './categories-list.component.html',
    styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

    categoryId!: number

    public loading = false;
    categories: Array<any> = [];

    @ViewChild(CategoryNewComponent)
    categoryNew!: CategoryNewComponent

    @ViewChild(CategoryEditComponent)
    categoryEdit!: CategoryEditComponent

    @ViewChild(CategoryDeleteComponent)
    categoryDelete!: CategoryDeleteComponent


    constructor(private http: HttpClient, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

    ngOnInit(): void {
        this.getCategories()
    }

    getCategories() {
        this.spinner.show()
        const token = window.localStorage.getItem('token')
        this.http.get<{ data: Array<any> }>('http://localhost:8000/api/categories', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .subscribe(response => {
                this.spinner.hide()
                this.categories = response.data
            }, (err) => {
                this.spinner.hide()
                this.toastr.error('Ops! Erro ao carregar as categorias.')
            })
    }

    showModalInsert() {
        this.categoryNew.showModal()
    }

    showModalEdit(categoryId: number) {
        this.categoryId = categoryId
        this.categoryEdit.showModal()
    }

    showModalDelete(categoryId: number) {
        this.categoryId = categoryId
        this.categoryDelete.showModal()
    }

    onInsertSuccess($event: any) {
        this.getCategories();
    }

    onInsertError($event: HttpErrorResponse) {
        console.log(event)
    }

    onEditSuccess($event: any) {

        this.getCategories();
    }

    onEditError($event: HttpErrorResponse) {
        console.log(event)
    }

    onDeleteSuccess($event: any) {
        this.getCategories()
    }

    onDeleteError($event: any) {
        console.log(event)
    }






}
