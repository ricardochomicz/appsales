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

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        CategoriesListComponent,
        NavbarComponent,
        ModalComponent,
        CategoryNewComponent,
        CategoryEditComponent,
        CategoryDeleteComponent
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
        NgxSpinnerModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
