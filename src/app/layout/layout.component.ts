import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  navigate(item: string) {
    switch (item) {
      case 'user-config':
        this.router.navigate(['/user-config']);
        break;
      case 'system-resources':
        this.router.navigate(['/system-resources']);
        break;
      // Add more cases for other menu items
      default:
        break;
    }
  }
}
