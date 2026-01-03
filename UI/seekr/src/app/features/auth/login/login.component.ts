import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
      userName : new FormControl(null, [Validators.minLength(4), Validators.required]),
      password : new FormControl(null, [Validators.minLength(8), Validators.required])
  });
  // model : LoginRequest;
  
  // constructor(private authService : AuthService){
  //   this.model ={
  //     email :'',
  //     password:''
  //   }
  // }
  authService = inject (AuthService);
  router = inject(Router);
  OnFormSubmit(){
    this.authService.LoginSubmit(this.loginForm.getRawValue().userName ?? undefined,this.loginForm.getRawValue().password ?? undefined).subscribe({
      next : (Response) =>{
       this.router.navigateByUrl('/');
      }
    })
  }

}
