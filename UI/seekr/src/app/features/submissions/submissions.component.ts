import { Component, OnInit } from '@angular/core';
import { LostService } from '../services/lost/lost.service';
import { Observable } from 'rxjs';
import { LostFound } from '../models/lostfound';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-submissions',
  imports: [CommonModule, RouterLink],
  templateUrl: './submissions.component.html',
  styleUrl: './submissions.component.css'
})
export class SubmissionsComponent implements OnInit {
  lostandfoundData$? : Observable<LostFound[]>
  constructor(private lostService : LostService){

  }
  ngOnInit(): void {
    this.lostandfoundData$ =this.lostService.getlosandfoundbyuser();
  }
 
}


