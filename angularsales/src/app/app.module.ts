import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { CategoriesListComponent } from './components/pages/category/categories-list/categories-list.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxLoadingModule } from 'ngx-loading';
import { ModalComponent } from './components/bootstrap/modal/modal.component';
import { CategoryNewComponent } from './components/pages/category/category-new/category-new.component';
import { CategoryEditComponent } from './components/pages/category/category-edit/category-edit.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgxSpinnerModule } from "ngx-spinner";
import { CategoryDeleteComponent } from './components/pages/category/category-delete/category-delete.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductsListComponent } from './components/pages/product/products-list/products-list.component';
import { ProductNewComponent } from './components/pages/product/product-new/product-new.component';
import { ProductEditComponent } from './components/pages/product/product-edit/product-edit.component';
import { ProductDeleteComponent } from './components/pages/product/product-delete/product-delete.component';
import { NumberFormatBrPipe } from './pipes/number-format-br.pipe';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgxCurrencyModule } from 'ngx-currency';
import { ProductCategoryListComponent } from './components/pages/product-category/product-category-list/product-category-list.component';
import { ProductCategoryNewComponent } from './components/pages/product-category/product-category-new/product-category-new.component';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        CategoriesListComponent,
        NavbarComponent,
        ModalComponent,
        CategoryNewComponent,
        CategoryEditComponent,
        CategoryDeleteComponent,
        ProductsListComponent,
        ProductNewComponent,
        ProductEditComponent,
        ProductDeleteComponent,
        NumberFormatBrPipe,
        ProductCategoryListComponent,
        ProductCategoryNewComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        NgxLoadingModule.forRoot({}),
        TooltipModule,
        NgxSpinnerModule,
        NgxPaginationModule,
        NgxMaskModule.forRoot(),
        NgxCurrencyModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
