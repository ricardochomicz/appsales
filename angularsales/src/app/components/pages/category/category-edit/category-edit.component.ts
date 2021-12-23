import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';

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

    _categoryId!: number

    category = {
        name: '',
        active: ''
    }

    constructor(private http: HttpClient, private toastr: ToastrService) { }

    ngOnInit(): void {
    }

    @Input()
    set categoryId(value: number) {

        this.loader = true;
        this._categoryId = value
        if (this._categoryId) {
            const token = window.localStorage.getItem('token')
            this.http.get<{ data: any }>(`http://localhost:8000/api/categories/${value}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .subscribe((response) => {
                this.category = response.data
                this.loader = false;
            }, (err) => {
                this.onError.emit(err)
                this.toastr.error('Ops! Erro ao carregar categoria')
            })
        }
    }

    submit() {
        const token = window.localStorage.getItem('token')
        this.http.put(`http://localhost:8000/api/categories/${this._categoryId}`, this.category, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).subscribe(response => {
            this.toastr.success('Categoria atualizada com sucesso!')
            this.onSuccess.emit(this.category)
            this.modal.hide()
        }, (err) => {
            this.toastr.error('Ops! Erro ao atualizar categoria')
            this.onError.emit(err)          
        })
    }

    showModal() {
        this.modal.show()
    }

    hideModal($event: any) {
        console.log(event)
    }

}
