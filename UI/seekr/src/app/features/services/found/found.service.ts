import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LostFound } from '../../models/lostfound';
import { LostFoundDTO } from '../../models/lostfoundDTO';
import { environment } from '../../../../environment/environment';

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
    return this.Http.post<void>(`${environment.apiUrl}/Found`, modal,{withCredentials:true});
  }

  latestcoordinates(latitude?: number, longitude?: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
  getFoundByID(id: string): Observable<LostFoundDTO> {
    console.log('Entered Found service to get found details');
    return this.Http.get<LostFoundDTO>(`${environment.apiUrl}/Found/${id}`);
  }

    getALLFound(): Observable<LostFoundDTO[]> {
    return this.Http.get<LostFoundDTO[]>(`${environment.apiUrl}/Found/GetFoundList`,{withCredentials:true});
  }
    deleteFound(founId : string){
    return this.Http.delete<LostFound>(`${environment.apiUrl}/Found/${founId}`,{withCredentials:true});
  }

  updateFound(modal? : LostFound):Observable<LostFound>{
    modal!.latitude = this.latitude;
    modal!.longitude = this.longitude;
   return this.Http.put<LostFound>(`${environment.apiUrl}/Found`, modal,{withCredentials:true});
  }
  updateFoundStatus(status? : string, currentId? :string , matchedId? : string):Observable<LostFound>{
      return this.Http.put<LostFound>(`${environment.apiUrl}/Found/UpdateFoundStatus/${status}/${matchedId}/${currentId}`,{},{withCredentials:true});

  }
}
