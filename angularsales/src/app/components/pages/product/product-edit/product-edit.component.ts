import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { Product } from 'src/app/models';
import { ProductHttpService } from 'src/app/services/http/product-http.service';

@Component({
    selector: 'product-edit',
    templateUrl: './product-edit.component.html',
    styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

    @ViewChild(ModalComponent)
    modal: ModalComponent

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>()
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()

    _productId: number

    product = {
        name: '',
        description: '',
        price: 0,
        active: true
    }

    constructor(private productHttpService: ProductHttpService, private toastr: ToastrService) { }

    ngOnInit(): void {
    }

    @Input()
    set productId(value: number) {
        this._productId = value
        if (this._productId) {
            this.productHttpService.get(this._productId)
                .subscribe({
                    // @ts-ignore
                    next: (product) => this.product = product,
                    error: (error: HttpErrorResponse) => this.toastr.error(`Erro ao carregar produto`)
                })
        }
    }

    submit() {
        this.productHttpService.update(this._productId, this.product)
            .subscribe({
                // @ts-ignore
                next: product => {
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
