import { Component, OnInit } from '@angular/core';
import { LostandfoudService } from '../../features/services/lostandfoud.service';
declare let L: any;
@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements OnInit {
  lat?: number;
  long?: number;
  constructor(private lostandfoundservice: LostandfoudService) {}
  ngOnInit(): void {
    this.lostandfoundservice.currentData.subscribe((data) => {
      this.lat = data?.latitude;
      this.long = data?.longitude;
      if (this.lat && this.long) {
        const map = L.map('map').setView([this.lat, this.long], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 15,
          attribution: '&copy; OpenStreetMap',
        }).addTo(map);

        var circle = L.circle([this.lat, this.long], {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
          radius: 500,
        }).addTo(map);
        circle.bindPopup('Your locato');
      }
    });
  }
}
