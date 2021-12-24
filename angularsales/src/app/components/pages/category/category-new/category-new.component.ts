import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/components/bootstrap/modal/modal.component';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models';
import { CategoryHttpService } from 'src/app/services/http/category-http.service';

@Component({
    selector: 'category-new',
    templateUrl: './category-new.component.html',
    styleUrls: ['./category-new.component.css']
})
export class CategoryNewComponent implements OnInit {

    @ViewChild(ModalComponent)
    modal!: ModalComponent;

    //emite os eventos successo ou erro
    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>()
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>()

    category: Category = {
        name: '',
    }

    constructor(private categoryHttp: CategoryHttpService, private toastr: ToastrService) { }

    ngOnInit(): void {
    }

    submit() {
        this.categoryHttp.create(this.category)
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
