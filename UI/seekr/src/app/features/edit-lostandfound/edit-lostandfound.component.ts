import { Component, model, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoundService } from '../services/found/found.service';
import { LostService } from '../services/lost/lost.service';
import { LostFound } from '../models/lostfound';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LostFoundDTO } from '../models/lostfoundDTO';
import { MapComponent } from '../../shared/map/map.component';

@Component({
  selector: 'app-edit-lostandfound',
  imports: [CommonModule, FormsModule,MapComponent],
  templateUrl: './edit-lostandfound.component.html',
  styleUrl: './edit-lostandfound.component.css',
})
export class EditLostandfoundComponent implements OnInit {
  id?: string;
  type?: string;
  lostfound?: Subscription;
  modal?: LostFoundDTO;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private foundService: FoundService,
    private lostService: LostService
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id') ?? '';
        this.type = params.get('type') ?? '';
        if (this.type == 'Found') {
          this.lostfound = this.foundService.getFoundByID(this.id).subscribe({
            next: (res) => {
              this.modal = res;
              this.lostService.changeData({latitude: this.modal?.latitude ?? 0 , longitude: this.modal?.longitude ?? 0});

            },
          });
        } else if (this.type == 'Lost') {
          this.lostfound = this.lostService.getLostByID(this.id).subscribe({
            next: (res) => {
              this.modal = res;
              this.lostService.changeData({latitude: this.modal?.latitude ?? 0 , longitude: this.modal?.longitude ?? 0});
            },
          });
        }
      },
    });
  }
  SubmitForm(): void {
    if (this.type == 'Found') {
      this.foundService.updateFound(this.modal).subscribe({
        next: (res) => {
          this.router.navigateByUrl('admin/lostandfoundlist');
        },
      });
    } else if (this.type == 'Lost') {
      this.lostService.updateLost(this.modal).subscribe({
        next: (res) => {
          this.router.navigateByUrl('admin/lostandfoundlist');
        },
      });
    }
  }
}
