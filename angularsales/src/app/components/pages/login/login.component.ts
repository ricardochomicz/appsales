import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    credentials = {
        email: 'admin@email.com',
        password: 'password'
    }

    constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }

    ngOnInit(): void {

    }

    login() {

        
            this.http.post<any>('http://localhost:8000/api/login', this.credentials)
            .subscribe((response) => {
                const token = response.token
                this.toastr.success('Seja bem-vindo!')
                window.localStorage.setItem('token', token)
                this.router.navigate(['categories/list'])
                return false;
            },(err) => {
                this.toastr.error('Credenciais inválidas!')
            })
       
       
            
       
    }

}
