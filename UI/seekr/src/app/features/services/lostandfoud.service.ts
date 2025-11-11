import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Coordinates } from '../models/coordinates.model';
import { LostandFound } from '../models/lostandfound';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LostandfoudService {
  latitude? : number;
  longitude? : number;
  constructor(private Http :HttpClient) {}
  $coordinates = new BehaviorSubject<Coordinates | undefined>(undefined);
  currentData = this.$coordinates.asObservable();

  changeData(coordinates: Coordinates) {
    this.$coordinates.next(coordinates);
  }

  latestcoordinates(latitude? : number , longitude? : number){
   this.latitude = latitude;
   this.longitude =longitude;
  }

  addlostorfound(modal :LostandFound):Observable<void>{
        modal.latitude = this.latitude;
        modal.longitude = this.longitude;
     return this.Http.post<void>("http://localhost:5058/api/LostandFound",modal)
  }

  getlosandfoundbyuser():Observable<LostandFound[]>{
   return this.Http.get<LostandFound[]>("http://localhost:5058/api/LostandFound")
  }
}
