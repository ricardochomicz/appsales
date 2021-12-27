import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { Product } from 'src/app/models';
import { ProductHttpService } from 'src/app/services/http/product-http.service';

@Component({
    selector: 'product-new',
    templateUrl: './product-new.component.html',
    styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {

    constructor(private productHttp: ProductHttpService) { }

    @ViewChild(ModalComponent)
    modal: ModalComponent

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>()
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()

    product: Product = {
        name: '',
        description: '',
        // @ts-ignore
        price: ''
    }


    ngOnInit(): void {
    }

    submit() {
        this.productHttp.create(this.product)
            .subscribe({
                next: (product) => {
                    this.onSuccess.emit(product)
                    this.modal.hide()
                },
                error: (error: HttpErrorResponse) => this.onError.emit(error)
            })
    }

    showModal() {
        this.modal.show()
    }

    hideModal($event: any) {
        this.modal.hide()
    }

}
