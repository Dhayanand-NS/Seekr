import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LostFound } from '../../models/lostfound';
import { LostFoundDTO } from '../../models/lostfoundDTO';

@Injectable({
  providedIn: 'root',
})
export class FoundService {
  latitude?: number;
  longitude?: number;

  constructor(private Http: HttpClient) {}

  addfound(modal: LostFound): Observable<void> {
    modal.latitude = this.latitude;
    modal.longitude = this.longitude;
    console.log(modal);
    return this.Http.post<void>('https://localhost:50542/api/Found', modal);
  }

  latestcoordinates(latitude?: number, longitude?: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
  getFoundByID(id: string): Observable<LostFoundDTO> {
    console.log('Entered Found service to get found details');
    return this.Http.get<LostFoundDTO>(`https://localhost:50542/api/Found/${id}`);
  }

    getALLFound(): Observable<LostFoundDTO[]> {
    return this.Http.get<LostFoundDTO[]>('https://localhost:50542/api/Found/GetFoundList');
  }
    deleteFound(founId : string){
    return this.Http.delete<LostFound>(`https://localhost:50542/api/Found/${founId}`);
  }

  updateFound(modal? : LostFound):Observable<LostFound>{
    modal!.latitude = this.latitude;
    modal!.longitude = this.longitude;
   return this.Http.put<LostFound>(`https://localhost:50542/api/Found`, modal);
  }
}
