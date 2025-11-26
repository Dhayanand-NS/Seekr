import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MapComponent } from '../../shared/map/map.component';
import { LostService } from '../services/lost/lost.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LostFound } from '../models/lostfound';
import { FoundService } from '../services/found/found.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lostandfoud',
  imports: [MapComponent, FormsModule, CommonModule],
  templateUrl: './lostandfound.component.html',
  styleUrl: './lostandfound.component.css',
})
export class LostandfoudComponent implements OnInit {
  modal: LostFound;
  isLostFoundModalvisible: boolean = false;
  lostorfound?: string;
  lat: number = 0;
  long: number = 0;
  constructor(private lostService: LostService, private foundService :FoundService, private router : Router) {
    this.modal = {
      title: '',
      description: '',
      type: '',
      imageURL: '',
      latitude: 0,
      longitude: 0,
      location: '',
      date: new Date(),
      contactinfo: '',
      radius : 500
    };
  }
  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.lostService.changeData({latitude: position.coords.latitude, longitude: position.coords.longitude});
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
    if (this.lostorfound == 'Lost') {
      this.modal.type = this.lostorfound;
      this.lostService.addlost(this.modal).subscribe({
        next: (res) => {
           console.log("This is the value of type :"+ this.lostorfound)
          this.router.navigateByUrl('submissions');
        },
      });
    }
    else if(this.lostorfound == 'Found'){
      this.modal.type = this.lostorfound;
      this.modal.latitude = this.lat;
      this.modal.longitude = this.long;
      this.foundService.addfound(this.modal).subscribe({
        next:(res)=>{
           console.log("This is the value of type :"+ this.lostorfound)
          this.router.navigateByUrl('submissions');
        }
      })
    }
  }
}
