import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login/login.component';
import { HomeComponent} from './components/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { LoggingInterceptor } from './components/login/http-intercepter';
import { MyFormComponent } from './my-form/my-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomeComponent,
    MyFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    // Add the LoggingInterceptor to the providers array
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
