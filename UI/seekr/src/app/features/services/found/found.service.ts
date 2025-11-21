import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LostFound } from '../../models/lostfound';

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
    return this.Http.post<void>('http://localhost:50542/api/Found', modal);
  }

  latestcoordinates(latitude?: number, longitude?: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
    getFoundByID(id : string ) : Observable<LostFound>{
                          console.log("Entered Found service to get found details");

    return this.Http.get<LostFound>(`http://localhost:50542/api/Found/${id}`)
  }
}
