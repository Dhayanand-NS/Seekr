import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LostFound } from '../../models/lostfound';

@Injectable({
  providedIn: 'root'
})
export class FoundService {

  constructor(private Http : HttpClient) { }

    addfound(modal :LostFound):Observable<void>{
       return this.Http.post<void>("http://localhost:50542/api/Found",modal)
    }
}
