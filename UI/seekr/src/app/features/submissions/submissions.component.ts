import { Component, OnInit } from '@angular/core';
import { LostService } from '../services/lost/lost.service';
import { Observable } from 'rxjs';
import { LostFound } from '../models/lostfound';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { SubmissionsService } from '../services/submissions/submissions.service';
import { Submissions } from '../models/submissions';

@Component({
  selector: 'app-submissions',
  imports: [CommonModule, RouterLink],
  templateUrl: './submissions.component.html',
  styleUrl: './submissions.component.css'
})
export class SubmissionsComponent implements OnInit {
  submissions$? : Observable<Submissions[]>
  constructor(private submissionsService : SubmissionsService){

  }
  ngOnInit(): void {
    this.submissions$ =this.submissionsService.getALLSubmissonsByUser();
    console.log(this.submissions$);
  }
}


