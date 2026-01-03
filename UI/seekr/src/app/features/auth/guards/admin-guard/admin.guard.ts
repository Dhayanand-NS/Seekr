import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {

    const authService = inject (AuthService);
    let user = authService.user();
    let router = inject(Router);
            console.log(user);
    if(user){
        if(user.roles.includes("Administrator")){
            return true;
        }
        else{
            authService.LogOut();
            return false;
        }
    }
    else{
        router.navigate(['/Login']);
        return false;
    }
};
