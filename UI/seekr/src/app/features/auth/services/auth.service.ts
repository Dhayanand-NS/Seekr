import { Injectable, signal, Signal } from '@angular/core';
import { LoginRequest } from '../models/loginRequest';
import { Observable, tap } from 'rxjs';
import { LoginResponse, User } from '../models/loginResponse';
import { HttpClient, httpResource, HttpResourceRef, HttpResourceRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  user = signal<User | null>(null); // Creating signal, like behavior subject

  LoginSubmit(email? : string, password? : string) : Observable<LoginResponse>{
    return this.http.post<LoginResponse>('https://localhost:50542/api/Auth/Login', {
      email:email,
      password : password
    }, {withCredentials : true}).pipe( tap(x=> this.user.set(x) ));
  }


  loadUser() : HttpResourceRef<User | undefined>{
    return httpResource<User>(()=>{
      const request : HttpResourceRequest={
        url : `https://localhost:50542/api/Auth/Me`,
        withCredentials:true
      }
      return request
    });
  }

  LogOut() {
    return this.http.post('https://localhost:50542/api/Auth/Logout',{},{
      withCredentials : true
    })
  }
} 
