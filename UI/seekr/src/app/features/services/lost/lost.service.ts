import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Coordinates } from '../../models/coordinates.model';
import { LostFound } from '../../models/lostfound';
import { HttpClient } from '@angular/common/http';
import { LostFoundDTO } from '../../models/lostfoundDTO';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class LostService {
  latitude?: number;
  longitude?: number;
  constructor(private Http: HttpClient) {}
  $coordinates = new BehaviorSubject<Coordinates | undefined>(undefined);
  currentData = this.$coordinates.asObservable();

  changeData(coordinates: Coordinates) {
    console.log('Entered services with values ' + coordinates.latitude +" "+coordinates.longitude );
    this.$coordinates.next(coordinates);
  }

  latestcoordinates(latitude?: number, longitude?: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  addlost(modal: LostFound): Observable<void> {
    modal.latitude = this.latitude;
    modal.longitude = this.longitude;
    console.log(modal);
    return this.Http.post<void>(`${environment.apiUrl}/Lost`, modal,{withCredentials:true});
  }

  getlosandfoundbyuser(): Observable<LostFound[]> {
    return this.Http.get<LostFound[]>(`${environment.apiUrl}/Lost`);
  }

  getLostByID(id: string): Observable<LostFoundDTO> {
    console.log('Entered Lost Service to get Lost details');
    return this.Http.get<LostFoundDTO>(`${environment.apiUrl}/Lost/${id}`);
  }

  getALLLost(): Observable<LostFoundDTO[]> {
    return this.Http.get<LostFoundDTO[]>(`${environment.apiUrl}/Lost/GetLostList`,{withCredentials:true});
  }

  deleteLost(lostId : string){
    return this.Http.delete<LostFound>(`${environment.apiUrl}/Lost/${lostId}`,{withCredentials:true});
  }
  updateLost(modal? : LostFound):Observable<LostFound>{
    modal!.latitude = this.latitude;
    modal!.longitude = this.longitude;
   return this.Http.put<LostFound>(`${environment.apiUrl}/Lost`, modal,{withCredentials:true});
  }
  updateLostStatus(status : string, currentId? :string , matchedId? : string):Observable<LostFound>{
   return this.Http.put<LostFound>(`${environment.apiUrl}/Lost/UpdateLostStatus/${status}/${matchedId}/${currentId}`,{},{withCredentials:true});
  }
}
