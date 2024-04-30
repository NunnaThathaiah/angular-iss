import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  constructor(private router: Router) {}

  navigate(item: string) {
    switch (item) {
      case 'home':
        this.router.navigate(['/home']);
        break;
      case 'settings':
        this.router.navigate(['/settings']);
        break;
      // Add more cases for other menu items
      default:
        break;
    }
  }
}