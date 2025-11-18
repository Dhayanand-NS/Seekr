import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Submissions } from '../../models/submissions';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubmissionsService {

  constructor(private http : HttpClient) { }
    getALLSubmissonsByUser():Observable<Submissions[]>{
     return this.http.get<Submissions[]>("http://localhost:50542/api/Submissions")
    }
}
