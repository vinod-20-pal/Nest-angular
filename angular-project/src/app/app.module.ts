import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './product/product.component';
import { RegisterComponent } from './register/register.component';
import { Environment } from 'src/environment';
import { MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ErrorCatchingInterceptor } from './interceptors/error-catching.interceptor';
import { AuthService } from './common/auth.service';
import { ToastrModule } from 'ngx-toastr';
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from './guards/guard.guard';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductComponent,
    RegisterComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    AuthService,
    Environment,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorCatchingInterceptor,
      multi: true
   }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
