import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';

declare let L: any;
@Component({
  selector: 'app-navbar',
  imports: [RouterModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
 authService = inject(AuthService);
 router = inject(Router)
 LogOut(){
  this.authService.LogOut().subscribe({
    next:() =>{
      // After logout, clear out the user signal
      this.authService.user.set(null);

      //After logout, redirect to login page
      this.router.navigateByUrl('/Login')

    }
  });
 }
}
