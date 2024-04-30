import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css']
})

export class MyFormComponent {
  constructor(private http: HttpClient) {}
  ngForm = {};
  onSubmit(form: any) {
    if (form.valid) {
      console.log('Form submitted:', form.value);
      const url = '/pm/1.2/login';
      const body = form.value;
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
          // this.error = 'Invalid username or password';
        }
      );
      // You can send form data to backend or perform other actions here
    } else {
      console.log('Form is invalid');
    }
  }
}
