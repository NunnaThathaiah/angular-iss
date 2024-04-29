import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginPageComponent } from './components/login/login.component';
import { UserConfigComponent } from './components/user-config/user-config.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'user-config', component: UserConfigComponent },
  // Additional routes can be defined here
  { path: '', redirectTo: '/login', pathMatch: 'full' } // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }