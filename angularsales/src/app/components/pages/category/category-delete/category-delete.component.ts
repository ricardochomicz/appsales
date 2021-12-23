import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';

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

    constructor(private http: HttpClient, private toastr: ToastrService) { }

    ngOnInit(): void {
    }

    @Input()
    set categoryId(value: number) {
        this.loader = true
        this._categoryId = value
        if (this._categoryId) {
            const token = window.localStorage.getItem('token')
            this.http.get<{ data: any }>(`http://localhost:8000/api/categories/${value}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).subscribe((response) => {
                this.category = response.data
                this.loader = false

            }, (error) => {
                this.toastr.error('Erro ao carregar categoria!')
            })
        }
    }

    destroy() {
        const token = window.localStorage.getItem('token')
        this.http.delete(`http://localhost:8000/api/categories/${this._categoryId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).subscribe((response) => {
            this.toastr.success('Categoria deletada com sucesso!')
            this.onSuccess.emit(this.category)
            this.modal.hide()
        }, (error) => {
            this.toastr.error('Erro ao deletar categoria!')
        })
    }

    showModal() {
        this.modal.show()
    }

    hideModal($event: any) {
        console.log(event)
    }


}
