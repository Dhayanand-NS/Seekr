import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LostFound } from '../models/lostfound';
import { LostService } from '../services/lost/lost.service';
import { FoundService } from '../services/found/found.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LostFoundDTO } from '../models/lostfoundDTO';

@Component({
  selector: 'app-lostandfound-list',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './lostandfound-list.component.html',
  styleUrl: './lostandfound-list.component.css',
})
export class LostandfoundListComponent implements OnInit {
  lost$?: Observable<LostFoundDTO[]>;
  found$?: Observable<LostFoundDTO[]>;
  constructor(
    private lostService: LostService,
    private foundService: FoundService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.lost$ = this.lostService.getALLLost();
    this.found$ = this.foundService.getALLFound();
  }
  DeleteFound(foundId: string) {
    this.foundService.deleteFound(foundId).subscribe({
      next: (res) => {
        this.ngOnInit();// calls the ngoninit method which is above declared, so it refreshes the page again 
      },
    });
  }
  DeleteLost(lostId: string) {
    this.lostService.deleteLost(lostId).subscribe({
      next: (res) => {
        this.ngOnInit();// calls the ngoninit method which is above declared, so it refreshes the page again 
      },
    });
  }
}
