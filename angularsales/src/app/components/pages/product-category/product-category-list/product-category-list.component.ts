import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductCategory } from 'src/app/models';
import { ProductCategoryService } from 'src/app/services/http/product-category.service';
import { ProductHttpService } from 'src/app/services/http/product-http.service';

@Component({
    selector: 'app-product-category-list',
    templateUrl: './product-category-list.component.html',
    styleUrls: ['./product-category-list.component.css']
})
export class ProductCategoryListComponent implements OnInit {

    productId: number
    product: Product
    productCategory: ProductCategory
    constructor(private route: ActivatedRoute,
        private productHttp: ProductHttpService,
        private productCategoryHttp: ProductCategoryService) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.productId = params['product']
            this.getProduct()
            this.getProductCategory()
        })
    }

    getProduct() {
        this.productHttp.get(this.productId)
            .subscribe(product => this.product = product)
    }

    getProductCategory() {
        this.productCategoryHttp.getAll(this.productId)
            .subscribe(productCategory => this.productCategory = productCategory)
    }

}
