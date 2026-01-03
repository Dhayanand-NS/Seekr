import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { inject } from '@angular/core';

export const userGuard: CanActivateFn = (route, state) => {
  
    const authService = inject (AuthService);
    let user = authService.user();
    let router = inject(Router);
    if(user){
        if(user.roles.includes("User")){
            return true;
        }
        else{
            authService.LogOut()
            return false;
        }
    }
    else{
        router.navigate(['/Login']);
        return false;
    }
};
