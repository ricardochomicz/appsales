import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesListComponent } from './components/pages/category/categories-list/categories-list.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ProductCategoryListComponent } from './components/pages/product-category/product-category-list/product-category-list.component';
import { ProductsListComponent } from './components/pages/product/products-list/products-list.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'categories/list',
        component: CategoriesListComponent,
        data: { routeName: "Categorias" }
    },
    {
        path: 'products/list',
        component: ProductsListComponent
    },
    {
        path: 'products/categories/list',
        component: ProductCategoryListComponent
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
