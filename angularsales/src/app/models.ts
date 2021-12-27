export interface Category {
    id?: number,
    name: string,
    active?: boolean,
    slug?: string,
    readonly created_at?: { date: string },
    readonly updated_at?: { date: string }
}

export interface Product {
    id?: number,
    name: string,
    description: string,
    price: number,
    active?: boolean,
    readonly slug?: string,
    readonly created_at?: { date: string },
    readonly updated_at?: { date: string }
}

export interface ProductCategory{
    product: Product,
    //coleção de categorias
    categories: Category[]
}

export interface User{
    id?: number,
    name: string,
    email: string,
    active?: boolean,
    readonly created_at?: { date: string },
    readonly updated_at?: { date: string }
}