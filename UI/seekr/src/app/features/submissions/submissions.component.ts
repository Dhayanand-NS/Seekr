import { Component, OnInit } from '@angular/core';
import { LostandfoudService } from '../services/lostandfoud.service';
import { Observable } from 'rxjs';
import { LostandFound } from '../models/lostandfound';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-submissions',
  imports: [CommonModule],
  templateUrl: './submissions.component.html',
  styleUrl: './submissions.component.css'
})
export class SubmissionsComponent implements OnInit {
  lostandfoundData$? : Observable<LostandFound[]>
  constructor(private lostandfoundService : LostandfoudService){

  }
  ngOnInit(): void {
    this.lostandfoundData$ =this.lostandfoundService.getlosandfoundbyuser();
  }
 
}
