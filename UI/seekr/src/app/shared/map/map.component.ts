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
    var position :any;
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

    //when location is searched in the search box, this event triggers.
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
        draggable: true,
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500,
      }).addTo(map);

      // for the below line the L.Marker creates a new marker but not the existing, if existing is needed use e.marker

      // e.marker = L.marker([this.lat, this.long], {
      //     draggable: true, // draggable marker
      //   }).addTo(map);
      // e.marker.on('drag', function (e: any) {
      //   var marker = e.target;
      //   var position = marker.getLatLng();
      //   map.panTo(new L.LatLng(position.lat, position.lng));
      //   searchCircle.setLatLng(position);//settig the coordinates to the circle while drag.
      // });


    });

    //When current location changes, below code receives the coordinates and work accordingly.
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



        currentMarker = L.marker([this.lat, this.long], {
          draggable: true, // draggable marker
        }).addTo(map);
        
        currentMarker.on('drag',  (e: any) => {
          var marker = e.target;
          position = marker.getLatLng();
          map.panTo(new L.LatLng(position.lat, position.lng));
          currentCircle.setLatLng(position);//settig the coordinates to the circle while drag.
          this.lat = position.lat;
          this.long = position.lng;
        });

          currentCircle = L.circle([this.lat, this.long], {
          draggable: true,
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
          radius: 500,
        }).addTo(map);
        currentCircle.bindPopup('Your locato');
      }
    });
  }
}
