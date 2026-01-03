import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LostFoundDTO } from '../../models/lostfoundDTO';
import { submissionFilter } from '../../models/submissionFilter';
import { lostfoundListFilter } from '../../models/lostfoundListFilter';

@Injectable({
  providedIn: 'root'
})
export class LostfoundlistService {

  constructor() { }
  http = inject(HttpClient);

  GetLostFoundList(filter : lostfoundListFilter) : Observable<LostFoundDTO[]>{
    return this.http.post<LostFoundDTO[]>('https://localhost:50542/api/admin/LostandFoundList',filter,{withCredentials:true})
  }
  GetLostFoundCount(): Observable<number>{
    return this.http.get<number>('https://localhost:50542/api/admin/LostandFoundList/Count',{withCredentials:true})

  }
}
