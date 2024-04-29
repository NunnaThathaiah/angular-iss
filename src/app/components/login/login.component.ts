import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(
    private http: HttpClient,
    private router: Router) {}

  login() {
    const url = 'pm/1.2/login';
    const body = { username: this.username, password: this.password };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(`url request ${url}`);
    this.http.post(url, body, { headers, observe: 'response' }).subscribe(
      (response) => {
        // Handle successful login response
        console.log('Login successful');
        this.router.navigate(['/user-config']);
      },
      (error) => {
        // Handle error response
        console.error('Login failed:', error);
        this.error = 'Invalid username or password';
      }
    );
  }
}