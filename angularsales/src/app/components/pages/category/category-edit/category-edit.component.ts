import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { ToastrService } from 'ngx-toastr';
import { CategoryHttpService } from 'src/app/services/http/category-http.service';

@Component({
    selector: 'category-edit',
    templateUrl: './category-edit.component.html',
    styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

    @ViewChild(ModalComponent)
    modal!: ModalComponent;

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>()
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()

    public loader = false;

    _categoryId: number;

    category = {
        name: '',
        active: true
    }

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
                }, (err: HttpErrorResponse) => {
                    this.loader = false;
                    this.toastr.error(`Erro ao carregar categoria (Cód.${err.status} - ${err.statusText})`)
                })
        }
    }

    submit() {
        // @ts-ignore
        this.categoryHttp.update(this._categoryId, this.category)
            // @ts-ignore
            .subscribe((category) => {
                this.onSuccess.emit(category)
                this.modal.hide()
            }, (err: HttpErrorResponse) => {
                this.onError.emit(err)
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
