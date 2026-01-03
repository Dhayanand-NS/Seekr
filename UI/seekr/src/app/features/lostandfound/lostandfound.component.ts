import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MapComponent } from '../../shared/map/map.component';
import { LostService } from '../services/lost/lost.service';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LostFound } from '../models/lostfound';
import { FoundService } from '../services/found/found.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lostandfoud',
  imports: [MapComponent, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './lostandfound.component.html',
  styleUrl: './lostandfound.component.css',
})
export class LostandfoudComponent implements OnInit {
 // modal: LostFound;
  submitForm = new FormGroup({
    title : new FormControl('', {nonNullable: true,validators : [Validators.required, Validators.minLength(5), Validators.maxLength(100)]}),
    description: new FormControl('',{nonNullable: true,validators :[Validators.required, Validators.maxLength(200)]}),
    type: new FormControl('',{nonNullable:true}),
    imageURL:new FormControl('',{nonNullable: true}),
    latitude:new FormControl(undefined,{nonNullable:true}),
    longitude:new FormControl(undefined,{nonNullable:true}),
    location: new FormControl('',{nonNullable: true,validators :[Validators.required]}),
    date:new FormControl(new Date(),{nonNullable: true,validators :[Validators.required]}),
    contactinfo: new FormControl('',{nonNullable: true,validators :[Validators.required]}),
    radius:new FormControl(500,{nonNullable:true}),
  });
  isLostFoundModalvisible: boolean = false;
  lostorfound?: string;
  lat: number = 0;
  long: number = 0;
  constructor(private lostService: LostService, private foundService :FoundService, private router : Router) {
    // this.modal = {
    //   title: '',
    //   description: '',
    //   type: '',
    //   imageURL: '',
    //   latitude: 0,
    //   longitude: 0,
    //   location: '',
    //   date: new Date(),
    //   contactinfo: '',
    //   radius : 500
    // };
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
    if (this.submitForm.invalid) {
    this.submitForm.markAllAsTouched();
    return;
  }
    const payload: LostFound = this.submitForm.getRawValue();

    if (this.lostorfound == 'Lost') {
      payload.type = this.lostorfound;
      this.lostService.addlost(payload).subscribe({
        next: (res) => {
           console.log("This is the value of type :"+ this.lostorfound)
          this.router.navigateByUrl('submissions');
        },
      });
    }
    else if(this.lostorfound == 'Found'){
      // this.modal.type = this.lostorfound;
      // this.modal.latitude = this.lat;
      // this.modal.longitude = this.long;
      payload.type = this.lostorfound;
      payload.latitude = this.lat;
      payload.longitude = this.long;
      this.foundService.addfound(payload).subscribe({
        next:(res)=>{
           console.log("This is the value of type :"+ this.lostorfound)
          this.router.navigateByUrl('submissions');
        }
      })
    }
  }
}
