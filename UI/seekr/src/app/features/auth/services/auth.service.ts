import { inject, Injectable, signal, Signal } from '@angular/core';
import { LoginRequest } from '../models/loginRequest';
import { Observable, tap } from 'rxjs';
import { LoginResponse, User } from '../models/loginResponse';
import { HttpClient, httpResource, HttpResourceRef, HttpResourceRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  router = inject(Router)
  user = signal<User | null>(null); // Creating signal, like behavior subject

  LoginSubmit(email? : string, password? : string) : Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${environment.apiUrl}/Auth/Login`, {
      email:email,
      password : password
    }, {withCredentials : true}).pipe( tap(x=> this.user.set(x) ));
  }


  loadUser() : HttpResourceRef<User | undefined>{
    return httpResource<User>(()=>{
      const request : HttpResourceRequest={
        url : `${environment.apiUrl}/Auth/Me`,
        withCredentials:true
      }
      return request
    });
  }

  LogOut() {
    return this.http.post(`${environment.apiUrl}/Auth/Logout`,{},{
      withCredentials : true
    }).subscribe({
    next:() =>{
      // After logout, clear out the user signal
      this.user.set(null);

      //After logout, redirect to login page
      this.router.navigateByUrl('/Login')

    }
  })
  }
} 
