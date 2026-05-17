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
          console.log("ENtered in else condition with logout route for user")
            authService.LogOut()
            return false;
        }
    }
    else{
                console.log(user);
        console.log("ENtered in else condition with login route for user")
        router.navigate(['/Login']);
        return false;
    }
};
