import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Submissions } from '../../models/submissions';
import { Observable } from 'rxjs';
import { submissionFilter } from '../../models/submissionFilter';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SubmissionsService {
  constructor(private http : HttpClient) { }
    getALLSubmissonsByUser(filter : submissionFilter):Observable<Submissions[]>{
     return this.http.post<Submissions[]>(`${environment.apiUrl}/Submissions`,filter,{withCredentials:true})
    }
    getSubmissionsCount(): Observable<number>{
      return this.http.get<number>(`${environment.apiUrl}/Submissions/count`,{withCredentials:true})
    }
}
