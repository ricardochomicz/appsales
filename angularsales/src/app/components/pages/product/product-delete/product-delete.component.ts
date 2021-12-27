import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { ProductHttpService } from 'src/app/services/http/product-http.service';

@Component({
    selector: 'product-delete',
    templateUrl: './product-delete.component.html',
    styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

    _productId: number
    product: any

    @ViewChild(ModalComponent)
    modal: ModalComponent

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>()
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()

    constructor(private productHttp: ProductHttpService, private toastr: ToastrService) { }

    ngOnInit(): void {
    }

    @Input()
    set productId(value: number) {
        this._productId = value
        if (this._productId) {
            this.productHttp.get(this._productId)
                .subscribe({
                    // @ts-ignore
                    next: (product) => this.product = product,
                    error: (error: HttpErrorResponse) => this.toastr.error(`Erro ao carregar produto`)
                })
        }
    }

    destroy() {
        this.productHttp.destroy(this._productId)
            .subscribe({
                next: (product) => {
                    this.onSuccess.emit(product)
                    this.modal.hide()
                },
                error: (error: HttpErrorResponse) => this.onError.emit(error)
            })
    }

    showModal() {
        setTimeout(() => {
            this.modal.show()
        }, 1000)
    }

    hideModal(e: any) {
        this.modal.hide()
    }



}
