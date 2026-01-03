import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LostService } from '../services/lost/lost.service';
import { FoundService } from '../services/found/found.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LostFoundDTO } from '../models/lostfoundDTO';
import { LostfoundlistService } from '../services/lostfoundlist/lostfoundlist.service';
import { lostfoundListFilter } from '../models/lostfoundListFilter';

@Component({
  selector: 'app-lostandfound-list',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './lostandfound-list.component.html',
  styleUrl: './lostandfound-list.component.css',
})
export class LostandfoundListComponent implements OnInit {
  lostfoundlist$?: Observable<LostFoundDTO[]>;
  filter : lostfoundListFilter;
  currentPage = 1;
  list:number[] =[];
  totalCount? : number;
  constructor(
    private lostService: LostService,
    private foundService: FoundService
  ) {
    this.filter={
      Type : null,
      Item : null,
      Date : new Date,
      PageNumber : 1,
      PageSize : 10
    }
  }
  lostfoundlistservice = inject(LostfoundlistService);
  ngOnInit(): void {
    this.lostfoundlistservice.GetLostFoundCount().subscribe({
      next : (res)=>{
          this.totalCount = res;
          this.list= new Array(Math.ceil(res/this.filter.PageSize));
            this.lostfoundlist$ = this.lostfoundlistservice.GetLostFoundList(this.filter);

      }
    });
  }
  DeleteFound(foundId: string) {
    this.foundService.deleteFound(foundId).subscribe({
      next: (res) => {
        this.ngOnInit();// calls the ngOninit method which is above declared, so it refreshes the page again 
      },
    });
  }
  DeleteLost(lostId: string) {
    this.lostService.deleteLost(lostId).subscribe({
      next: (res) => {
        this.ngOnInit();// calls the ngOninit method which is above declared, so it refreshes the page again 
      },
    });
  }
    OnFormSubmit(){
    this.lostfoundlist$ = this.lostfoundlistservice.GetLostFoundList(this.filter);
  }
    getDataByPage(pagenumber : number, pageSize : number){
    if(pagenumber > this.list.length){
      return
    }
    if(pagenumber < 1){
      return
    }
    this.filter={
      Type : null,
      Item : null,
      Date : new Date,
      PageNumber : pagenumber,
      PageSize : pageSize
    }
    this.currentPage = this.filter.PageNumber;
    this.lostfoundlist$ = this.lostfoundlistservice.GetLostFoundList(this.filter);
  }
}
