import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

import { MatFormFieldModule } from '@angular/material/form-field';
import { AgGridModule } from 'ag-grid-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login/login.component';
import { HomeComponent} from './components/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { LoggingInterceptor } from './components/login/http-intercepter';
import { MyFormComponent } from './my-form/my-form.component';
import { UserConfigComponent } from './components/user-config/user-config.component';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { LayoutComponent } from './layout/layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SystemResourcesComponent } from './components/system-resources/system-resources.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomeComponent,
    MyFormComponent,
    UserConfigComponent,
    UserDialogComponent,
    LayoutComponent,
    SystemResourcesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    AgGridModule,
    MatMenuModule,
    MatButtonModule,
    MatExpansionModule
  ],
  providers: [
    provideClientHydration(),
    // Add the LoggingInterceptor to the providers array
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
    provideAnimationsAsync()
  ],

  exports: [LayoutComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
