import { Component, OnInit } from '@angular/core';
import { MapComponent } from '../../shared/map/map.component';
import { LostService } from '../services/lost/lost.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-matchfound',
  imports: [MapComponent],
  templateUrl: './matchfound.component.html',
  styleUrl: './matchfound.component.css'
})
export class MatchfoundComponent implements OnInit{
  lat?: number;
  long?: number;
  constructor(private lostService : LostService, private route: ActivatedRoute){}
  ngOnInit(): void {
      this.route.paramMap.subscribe({
        next:(params)=>{
          this.lat = parseFloat( params.get('latitude') ?? " ");
          this.long = parseFloat( params.get('longitude') ?? " ");
          console.log(`lat${this.lat} and long${this.long }`)
        }
      })
      this.lostService.changeData({latitude:this.lat ?? 0, longitude:this.long ?? 0});
  }
}
