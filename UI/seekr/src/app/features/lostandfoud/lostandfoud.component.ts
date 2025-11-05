import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MapComponent } from '../../shared/map/map.component';
import { LostandfoudService } from '../services/lostandfoud.service';
import { Coordinates } from '../models/coordinates.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lostandfoud',
  imports: [MapComponent,FormsModule, CommonModule],
  templateUrl: './lostandfoud.component.html',
  styleUrl: './lostandfoud.component.css',
})
export class LostandfoudComponent implements OnInit {
  constructor(private lostandfoudService: LostandfoudService) {}
  isLostFoundModalvisible : boolean=false;
  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.lostandfoudService.changeData({latitude: position.coords.latitude,longitude: position.coords.longitude});
    });
    setTimeout(()=>{
      this.isLostFoundModalvisible = true;
    },2000)
  }
} 
