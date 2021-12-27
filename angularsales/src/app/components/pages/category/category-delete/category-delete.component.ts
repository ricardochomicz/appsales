import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { CategoryHttpService } from 'src/app/services/http/category-http.service';

@Component({
    selector: 'category-delete',
    templateUrl: './category-delete.component.html',
    styleUrls: ['./category-delete.component.css']
})
export class CategoryDeleteComponent implements OnInit {

    @ViewChild(ModalComponent)
    modal!: ModalComponent

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>()
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()

    public loader = false;

    _categoryId!: number
    category: any;

    constructor(private categoryHttp: CategoryHttpService, private toastr: ToastrService) { }

    ngOnInit(): void {
    }

    @Input()
    set categoryId(value: number) {
        this.loader = true;
        this._categoryId = value
        if (this._categoryId) {
            this.categoryHttp.get(this._categoryId)
                .subscribe(category => {
                    // @ts-ignore
                    this.category = category
                    this.loader = false;
                })
        }
    }

    destroy() {
        this.categoryHttp.destroy(this._categoryId)
            .subscribe((category) => {
                this.onSuccess.emit(category)
                this.modal.hide()
            }, (error: HttpErrorResponse) => {
                this.onError.emit(error)
            })
    }

    showModal() {
        setTimeout(() => {
            this.modal.show()
        }, 1000)
    }

    hideModal($event: any) {
        console.log(event)
    }


}
