// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginPageComponent {
//   username: string = '';
//   password: string = '';
//   error: string = '';

//   async login() {
//     try {
//       const response = await fetch('pm/1.2/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ username: this.username, password: this.password })
//       });

//       if (!response.ok) {
//         const errorMessage = await response.text();
//         throw new Error(errorMessage);
//       }

//       // Redirect or perform other actions upon successful login
//       console.log('Login successful');
//     } catch (error) {
//       console.error('Login failed:', error);
//       this.error = 'Invalid username or password';
//     }
//   }
// }

import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private http: HttpClient) {}

  login() {
    const targetUrl = 'http://172.17.0.3';
    const endpointPath = '/pm/1.2/login';
    const url = `${targetUrl}${endpointPath}`;
    // const url = 'pm/1.2/login';
    // const url ='/assets/login-response.json';
    const body = { username: this.username, password: this.password };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(`url request ${url}`);
    this.http.post(url, body, { headers, observe: 'response' }).subscribe(
      (response) => {
        // Handle successful login response
        console.log('Login successful');
      },
      (error) => {
        // Handle error response
        console.error('Login failed:', error);
        this.error = 'Invalid username or password';
      }
    );
  }
}