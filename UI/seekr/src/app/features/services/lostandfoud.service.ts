import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Coordinates } from '../models/coordinates.model';

@Injectable({
  providedIn: 'root'
})
export class LostandfoudService {

  constructor() { }
       $coordinates = new BehaviorSubject<Coordinates|undefined>(undefined);
      currentData = this.$coordinates.asObservable();

      changeData(coordinates : Coordinates) {
        this. $coordinates.next(coordinates);
      }
}
  