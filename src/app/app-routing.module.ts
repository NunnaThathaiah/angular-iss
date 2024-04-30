import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login/login.component';
import { UserConfigComponent } from './components/user-config/user-config.component';
import { LayoutComponent } from './layout/layout.component';
import { SystemResourcesComponent } from './components/system-resources/system-resources.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'user-config', component: UserConfigComponent },
      { path: 'system-resources', component: SystemResourcesComponent },
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' } // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }