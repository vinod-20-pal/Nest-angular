import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Environment } from 'src/environment';
import { HelperService } from '../common/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(
    private router: Router,
    private env:Environment,
    private helper: HelperService
  ) {     
      localStorage.removeItem('Token');
      this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  /**
   * Purpose: User login 
   */
  onSubmit() {
    let url = '/user/login';
    let data = {
      "email": this.loginForm.value.email,
      "pass": this.loginForm.value.password
    }
    this.helper.post(`${this.env.BASE_URL}${url}`,data).subscribe((res: any) => {
      localStorage.setItem('Token', JSON.stringify(res.token));
      localStorage.setItem('userName', res.user.name);
      this.router.navigate(['/product']);
      this.helper.headerFlag.next(true);
    });
  }

  get getEmail() {
    return this.loginForm.get('email')
  }

  get getPassword() {
    return this.loginForm.get('pasword')
  }
}
