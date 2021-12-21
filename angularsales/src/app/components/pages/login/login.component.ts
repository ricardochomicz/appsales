import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
    }

    login() {
        this.http.post('http://localhost:8000/api/login', this.credentials)
            .subscribe((response) => console.log(response))
        return false;
    }

}
