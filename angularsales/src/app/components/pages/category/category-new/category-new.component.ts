import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'category-new',
    templateUrl: './category-new.component.html',
    styleUrls: ['./category-new.component.css']
})
export class CategoryNewComponent implements OnInit {

    @ViewChild(ModalComponent)
    modal!: ModalComponent;

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>()
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()

    category = {
        name: ''
    }

    constructor(private http: HttpClient, private toastr: ToastrService) { }

    ngOnInit(): void {
    }

    submit() {
        const token = window.localStorage.getItem('token')
        this.http.post('http://localhost:8000/api/categories', this.category, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).subscribe(response => {
            this.onSuccess.emit(this.category)
            this.modal.hide()
            this.toastr.success('Categoria Cadastrada com sucesso!')
        }, (err) => {
            this.onError.emit(err)
            this.toastr.error('Ops! Erro ao cadastrar')
        })
    }

    showModal() {
        this.modal.show()
    }

    hideModal($event: any) {
        console.log(event)
    }

}
