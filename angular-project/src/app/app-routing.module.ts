import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/guard.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path:'product',canActivate: [AuthGuard],component: ProductComponent},
  {path: 'register', component: RegisterComponent},
  {path:'**', redirectTo:'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
