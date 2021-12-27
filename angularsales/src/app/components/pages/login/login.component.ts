import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

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

    constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

    ngOnInit(): void {

    }

    login() {
        this.authService.login(this.credentials)
            .subscribe({
                next: (data) => {
                    const token = data.token
                    this.toastr.success('Seja bem-vindo!')
                    window.localStorage.setItem('token', token)
                    this.router.navigate(['categories/list'])
                },
                error: (error: HttpErrorResponse) => {
                    this.toastr.error('Credenciais inválidas!')
                }
            })
        return false;
    }

}
