import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./core/components/navbar/navbar.component";
import { AuthService } from './features/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
imports: [RouterOutlet, NavbarComponent]
})
export class AppComponent {
  title = 'seekr';
  authService = inject(AuthService);

  loadUserRef = this.authService.loadUser();
  user = this.loadUserRef.value;

  effectRef = effect(()=>{
    const userValue = this.user();

    if(userValue){
      this.authService.user.set(userValue);
    }
  })
}
