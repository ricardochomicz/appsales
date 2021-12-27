import { HttpErrorResponse } from '@angular/common/http';
import { getAllLifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Category, Product, ProductCategory } from 'src/app/models';
import { CategoryHttpService } from 'src/app/services/http/category-http.service';
import { ProductCategoryHttpService } from 'src/app/services/http/product-category-http.service';

@Component({
  selector: 'product-category-new',
  templateUrl: './product-category-new.component.html',
  styleUrls: ['./product-category-new.component.css']
})
export class ProductCategoryNewComponent implements OnInit {

  categories: Category[] = []
  categoriesId: number[] = []

  @Input()
  productId: number
  @Input()
  productCategory: ProductCategory

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>()
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()

  constructor(private categoryHttp: CategoryHttpService,
    private productCategoryHttp: ProductCategoryHttpService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this.categoryHttp.getAll({all: 1})
      .subscribe(response => this.categories = response.data)
  }

  submit() {
    const categoriesId = this.mergeCategories()
    this.productCategoryHttp.create(this.productId, categoriesId)
      .subscribe({
        next: productCategory => {
          this.onSuccess.emit(productCategory)
        },
        error: (error: HttpErrorResponse) => this.onError.emit(error)
      })
    return false
  }

  private mergeCategories(): number[] {
    //pega um array de objeto categories e converte para um array de ids
    const categoriesId = this.productCategory.categories.map((category) => category.id)
    const newCategoriesId = this.categoriesId.filter((category) => {
      //pega somente os elementos que não pertencem ao array
      return categoriesId.indexOf(category) == -1
    })
    // @ts-ignore
    return categoriesId.concat(newCategoriesId);
  }

}
