import { Component } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginPageComponent {
  public readonly loginForm: UntypedFormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  username: string = '';
  password: string = '';
  error: string = '';
  constructor(
    private router: Router,
    private dataService: DataService,
    private fb: UntypedFormBuilder) {}

  login() {
    const url = 'pm/1.2/login';
    const data = { username: this.username, password: this.password };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(`url request ${url}`);
    this.dataService.create(url, data, { headers, observe: 'response', withCredentials: true}).subscribe(
      (response) => {
        console.log(response.body)
          // Extract the gambitCookie from the response
        const gambitCookie = response.body.response.webObjects[0].gambitCookie;
        console.log(gambitCookie)
        document.cookie = `GAMBIT=${gambitCookie};`;
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
