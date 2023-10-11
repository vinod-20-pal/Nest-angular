import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Environment } from 'src/environment';
import { HelperService } from '../common/helper.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  register_flag: boolean = false;
  constructor(
    private router: Router,
    private env:Environment,
    private helper: HelperService
  ){
      this.registerForm = new FormGroup({
        name: new FormControl('',[Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
      });
    }

    /**
     * Purpose: Create New User
     */
    onSubmit(){
    let url = '/user/signup';
    let data = {
      "name": this.registerForm.value.name,
      "email":this.registerForm.value.email,
      "pass": this.registerForm.value.password
    }
    this.helper.post(`${this.env.BASE_URL}${url}`,data).subscribe((res: any) => {
      if(res){
        localStorage.setItem('Token', JSON.stringify(res.token));
        this.router.navigate(['/login']);
      }
    });
  }

  get getEmail(){
    return this.registerForm.get('email')
  }

  get getPassword(){
    return this.registerForm.get('pasword')
  }

  get getName(){
    return this.registerForm.get('name');
  }
}
