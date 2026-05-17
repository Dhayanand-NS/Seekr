import { Component, OnInit } from '@angular/core';
import { MapComponent } from '../../shared/map/map.component';
import { LostService } from '../services/lost/lost.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LostFound } from '../models/lostfound';
import { FoundService } from '../services/found/found.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-matchfound',
  imports: [MapComponent, CommonModule],
  templateUrl: './matchfound.component.html',
  styleUrl: './matchfound.component.css',
})
export class MatchfoundComponent implements OnInit {
  lat?: number;
  long?: number;
  matchedId?: string;
  type?: string;
  matchfound$?: Observable<LostFound>;
  matchedItem?: LostFound;
  currentId? : string;
  constructor(
    private lostService: LostService,
    private route: ActivatedRoute,
    private foundService: FoundService
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.lat = parseFloat(params.get('latitude') ?? ' ');
        this.long = parseFloat(params.get('longitude') ?? ' ');
        this.matchedId = params.get('matchedId') ?? ' ';
        this.type = params.get('type') ?? ' ';
        this.currentId = params.get('currentId') ?? ' ';
        console.log('Matched Id is here' + this.matchedId);

        this.loadMatchedItem();
      },
    });
    this.lostService.changeData({
      latitude: this.lat ?? 0,
      longitude: this.long ?? 0,
    });
  }
  private loadMatchedItem() {
    if (!this.matchedId) {
      return;
    }

    if (this.type == 'Lost') {
      this.matchfound$ = this.foundService.getFoundByID(this.matchedId);
    } else if (this.type == 'Found') {
      this.matchfound$ = this.lostService.getLostByID(this.matchedId);
    }

    this.matchfound$?.subscribe((item) => {
      this.matchedItem = item;
    });
  }

  UpdateStatusByUser(status: string) {
    if (status) {
      if (this.type == 'Lost') {
        console.log(this.matchedId);
        this.lostService.updateLostStatus(status, this.currentId, this.matchedId).subscribe({
          next: () => {
            this.loadMatchedItem();
          },
        });
      } else if (this.type == 'Found') {
        this.foundService.updateFoundStatus(status,this.currentId, this.matchedId).subscribe({
          next: () => {
            this.loadMatchedItem();
          },
        });
      }
    }
  }
}
