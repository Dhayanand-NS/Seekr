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
    let map = L.map('map');
    let searchCircle = L.circle;
    let currentCircle = L.circle;
    let currentMarker = L.marker;

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 15,
      attribution: '&copy; OpenStreetMap',
    }).addTo(map);

    // SearchBox
    const geocoder = L.Control.Geocoder.nominatim();
    const geocoderControl = L.Control.geocoder({
      geocoder: geocoder,
      position: 'topright',
    }).addTo(map);

    geocoderControl.on('markgeocode', (e: any) => {
      const latlng = e.geocode.center;
      this.lat = latlng.lat;
      this.long = latlng.lng;
      if (currentCircle && map.hasLayer(currentCircle)) {
        map.removeLayer(currentCircle);
      }
      if (searchCircle && map.hasLayer(searchCircle)) {
        map.removeLayer(searchCircle);
      }
      if (currentMarker && map.hasLayer(currentMarker)) {
        map.removeLayer(currentMarker);
      }
      if (e.marker && map.hasLayer(e.marker)) {
        map.removeLayer(e.marker);
      }
      searchCircle = L.circle(latlng, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500,
      }).addTo(map);
    });
    this.lostandfoundservice.currentData.subscribe((data) => {
      this.lat = data?.latitude;
      this.long = data?.longitude;

      if (this.lat && this.long) {
        if (currentCircle && map.hasLayer(currentCircle)) {
          map.removeLayer(currentCircle);
        }
        if (searchCircle && map.hasLayer(searchCircle)) {
          map.removeLayer(searchCircle);
        }
        if (currentMarker && map.hasLayer(currentMarker)) {
          map.removeLayer(currentMarker);
        }
        map.setView([this.lat, this.long], 13);

        currentCircle = L.circle([this.lat, this.long], {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
          radius: 500,
        }).addTo(map);
        currentCircle.bindPopup('Your locato');

        currentMarker = L.marker([this.lat, this.long]).addTo(map);
      }
    });
  }
}
