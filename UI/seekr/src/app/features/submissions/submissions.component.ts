import { Component, OnInit } from '@angular/core';
import { LostService } from '../services/lost/lost.service';
import { Observable, tap } from 'rxjs';
import { LostFound } from '../models/lostfound';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { SubmissionsService } from '../services/submissions/submissions.service';
import { Submissions } from '../models/submissions';
import { submissionFilter } from '../models/submissionFilter';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-submissions',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './submissions.component.html',
  styleUrl: './submissions.component.css'
})
export class SubmissionsComponent implements OnInit {
  submissions$? : Observable<Submissions[]>
  submissionFilter : submissionFilter
  currentPage = 1;
  list:number[] =[];
  totalCount? : number;
  constructor(private submissionsService : SubmissionsService){
    this.submissionFilter={
      Type : null ,
      MatchFound : null,
      Date : new Date,
      PageNumber : 1,
      PageSize : 10
    }
  }
  ngOnInit(): void {
    this.submissionsService.getSubmissionsCount().subscribe({
      next:(value)=>{
          this.totalCount = value;
          this.list= new Array(Math.ceil(value/this.submissionFilter.PageSize));
          this.submissions$ =this.submissionsService.getALLSubmissonsByUser(this.submissionFilter).pipe(tap(data => console.log(data))) ;
      }
    })
    // this.submissions$.subscribe( data =>{
    //   console.log(data);
    // })
  }
  OnFormSubmit(){
    this.submissions$ =this.submissionsService.getALLSubmissonsByUser(this.submissionFilter);
  }
    getDataByPage(pagenumber : number, pageSize : number){
    if(pagenumber > this.list.length){
      return
    }
    if(pagenumber < 1){
      return
    }
    this.submissionFilter={
      Type : null,
      MatchFound : null,
      Date : new Date,
      PageNumber : pagenumber,
      PageSize : pageSize
    }
    this.currentPage = this.submissionFilter.PageNumber;
    this.submissions$ =this.submissionsService.getALLSubmissonsByUser(this.submissionFilter);
  }
}


