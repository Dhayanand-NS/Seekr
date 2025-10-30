import { Component, OnInit } from '@angular/core';
import { MapComponent } from "../../shared/map/map.component";
import { LostandfoudService } from '../services/lostandfoud.service';
import { Coordinates } from '../models/coordinates.model';

@Component({
  selector: 'app-lostandfoud',
  imports: [MapComponent],
  templateUrl: './lostandfoud.component.html',
  styleUrl: './lostandfoud.component.css'
})
export class LostandfoudComponent implements OnInit {
  constructor(private lostandfoudService: LostandfoudService){}
  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.lostandfoudService.changeData({latitude : position.coords.latitude, longitude : position.coords.longitude});
});
 }

}
