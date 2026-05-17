import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {

    const authService = inject (AuthService);
    let user = authService.user();
    let router = inject(Router);
    if(user){
        if(user.roles.includes("Administrator")){
            return true;
        }
        else{
                            console.log("ENtered in else condition with logout route for admin")
            authService.LogOut();
            return false;
        }
    }
    else{
                console.log("ENtered in else condition with login route for admin")
        router.navigate(['/Login']);
        return false;
    }
};
