import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models';
import { CategoryHttpService } from 'src/app/services/http/category-http.service';
import { CategoryDeleteComponent } from '../category-delete/category-delete.component';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { CategoryNewComponent } from '../category-new/category-new.component';
import { CategoryDeleteService } from './category-delete.service';
import { CategoryInsertService } from './category-insert.service';
import { CategoryUpdateService } from './category-update.service';


@Component({
    selector: 'categories-list',
    templateUrl: './categories-list.component.html',
    styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

    categoryId: number

    pagination = {
        page: 1,
        totalItems: 0,
        itemsPerPage: 15
    }

    public loading = false;
    categories: Array<Category> = [];

    @ViewChild(CategoryNewComponent)
    categoryNew: CategoryNewComponent

    @ViewChild(CategoryEditComponent)
    categoryEdit!: CategoryEditComponent

    @ViewChild(CategoryDeleteComponent)
    categoryDelete!: CategoryDeleteComponent


    constructor(private categoryHttp: CategoryHttpService,
        private toastr: ToastrService,
        private spinner: NgxSpinnerService,
        public categoryInsertService: CategoryInsertService,
        public categoryUpdateService: CategoryUpdateService,
        public categoryDeleteService: CategoryDeleteService) {
        this.categoryInsertService.categoryListComponent = this
        this.categoryUpdateService.categoryListComponent = this
        this.categoryDeleteService.categoryListComponent = this
    }

    ngOnInit(): void {
        this.getCategories()
    }

    getCategories() {
        this.spinner.show()
        this.categoryHttp.getAll(this.pagination.page)
            .subscribe(response => {
                this.spinner.hide()
                this.categories = response.data
                this.pagination.totalItems = response.meta.total
                this.pagination.itemsPerPage = response.meta.per_page
            }, (err: HttpErrorResponse) => {
                this.spinner.hide()
                this.toastr.error(`Erro ao carregar as categorias (Cód. ${err.status} - ${err.statusText})`)
            })
    }

    pageChanged(page: number) {
        this.pagination.page = page
        this.getCategories()
    }












}
