import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LostFoundDTO } from '../../models/lostfoundDTO';
import { submissionFilter } from '../../models/submissionFilter';
import { lostfoundListFilter } from '../../models/lostfoundListFilter';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class LostfoundlistService {

  constructor() { }
  http = inject(HttpClient);

  GetLostFoundList(filter : lostfoundListFilter) : Observable<LostFoundDTO[]>{
    return this.http.post<LostFoundDTO[]>(`${environment.apiUrl}/admin/LostandFoundList`,filter,{withCredentials:true})
  }
  GetLostFoundCount(): Observable<number>{
    return this.http.get<number>(`${environment.apiUrl}/admin/LostandFoundList/Count`,{withCredentials:true})

  }
}
