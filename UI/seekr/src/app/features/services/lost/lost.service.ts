import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Coordinates } from '../../models/coordinates.model';
import { LostFound } from '../../models/lostfound';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LostService {
  latitude? : number;
  longitude? : number;
  constructor(private Http :HttpClient) {}
  $coordinates = new BehaviorSubject<Coordinates | undefined>(undefined);
  currentData = this.$coordinates.asObservable();

  changeData(coordinates: Coordinates) {
        console.log("Entered services")
    this.$coordinates.next(coordinates);
  }

  latestcoordinates(latitude? : number , longitude? : number){
   this.latitude = latitude;
   this.longitude =longitude;
  }

  addlost(modal :LostFound):Observable<void>{
        modal.latitude = this.latitude;
        modal.longitude = this.longitude;
     return this.Http.post<void>("http://localhost:50542/api/Lost",modal)
  }

  getlosandfoundbyuser():Observable<LostFound[]>{
   return this.Http.get<LostFound[]>("http://localhost:50542/api/Lost")
  }

  getLostByID(id : string ) : Observable<LostFound>{
    console.log("Entered Lost Service to get Lost details");
    return this.Http.get<LostFound>(`http://localhost:50542/api/Lost/${id}`)
  }
}
