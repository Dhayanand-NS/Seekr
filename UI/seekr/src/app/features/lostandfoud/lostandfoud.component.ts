import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MapComponent } from '../../shared/map/map.component';
import { LostandfoudService } from '../services/lostandfoud.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LostandFound } from '../models/lostandfound';

@Component({
  selector: 'app-lostandfoud',
  imports: [MapComponent, FormsModule, CommonModule],
  templateUrl: './lostandfoud.component.html',
  styleUrl: './lostandfoud.component.css',
})
export class LostandfoudComponent implements OnInit {
  modal: LostandFound;
  isLostFoundModalvisible: boolean = false;
  lostorfound?: string;
  lat: number = 0;
  long: number = 0;
  constructor(private lostandfoudService: LostandfoudService) {
    this.modal = {
      title: '',
      description: '',
      type: '',
      imageURL: '',
      latitude: 0,
      longitude: 0,
      location: '',
      datefoundlost: new Date(),
      contactinfo: '',
    };
  }
  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.lostandfoudService.changeData({latitude: position.coords.latitude, longitude: position.coords.longitude});
      this.lat = position.coords.latitude;
      this.long = position.coords.longitude;
    });
    setTimeout(() => {
      this.isLostFoundModalvisible = true;
    }, 2000);
  }
  setLostFound(islostorfound: string) {
    this.lostorfound = islostorfound;
  }

  submitLostandFound() {
    console.log(this.modal);
    this.lostandfoudService.addlostorfound(this.modal).subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }
}
