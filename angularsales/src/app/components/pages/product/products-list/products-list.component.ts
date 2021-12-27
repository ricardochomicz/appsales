import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models';
import { ProductHttpService } from 'src/app/services/http/product-http.service';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { ProductNewComponent } from '../product-new/product-new.component';
import { ProductUpdateService } from './product-update.service';
import { ProductInsertService } from './product-insert.service';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';
import { ProductDeleteService } from './product-delete.service';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

    productId: number
    products: Array<Product> = []

    public loader = false;

    @ViewChild(ProductNewComponent)
    productNew: ProductNewComponent

    @ViewChild(ProductEditComponent)
    productEdit: ProductEditComponent

    @ViewChild(ProductDeleteComponent)
    productDelete: ProductDeleteComponent

    pagination = {
        page: 1,
        totalItems: 0,
        itemsPerPage: 15,
    }

    constructor(private productHttp: ProductHttpService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        public productInsertService: ProductInsertService,
        public productUpdateService: ProductUpdateService,
        public productDeleteService: ProductDeleteService) {
        this.productInsertService.productListComponent = this
        this.productUpdateService.productListComponent = this
        this.productDeleteService.productListComponent = this
    }

    ngOnInit(): void {
        this.spinner.show()
        this.getProducts()
    }

    getProducts() {
        this.productHttp.getAll({page: this.pagination.page})
            .subscribe((response) => {
                this.products = response.data
                this.spinner.hide()
                this.pagination.totalItems = response.meta.total
                this.pagination.itemsPerPage = response.meta.per_page
            }, (error: HttpErrorResponse) => {
                this.toastr.error(`Erro ao carregar produtos (Cód.${error.status} - ${error.statusText}`)
            })
    }

    pageChanged(page: number) {
        this.pagination.page = page
        this.getProducts()
    }

}
