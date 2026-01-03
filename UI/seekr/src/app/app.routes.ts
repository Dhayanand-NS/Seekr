import { Routes } from '@angular/router';
import { MapComponent } from './shared/map/map.component';
import { LostandfoudComponent } from './features/lostandfound/lostandfound.component';
import { HomeComponent } from './features/home/home.component';
import { SubmissionsComponent } from './features/submissions/submissions.component';
import { MatchfoundComponent } from './features/matchfound/matchfound.component';
import { LostandfoundListComponent } from './features/lostandfound-list/lostandfound-list.component';
import { EditLostandfoundComponent } from './features/edit-lostandfound/edit-lostandfound.component';
import { LoginComponent } from './features/auth/login/login.component';
import { adminGuard } from './features/auth/guards/admin-guard/admin.guard';
import { userGuard } from './features/auth/guards/user-guard/user.guard';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    },
    {
        path:'map',
        component: MapComponent
    },
    {
        path:'lostandfound',
        component:LostandfoudComponent,
        canActivate :[userGuard]
    },
    {
        path:'submissions',
        component:SubmissionsComponent,
        canActivate :[userGuard]
    },
    {
        path:'matchfound/:latitude/:longitude/:matchedId/:type',
        component:MatchfoundComponent,
        canActivate :[userGuard]
    },
    {
        path:'admin/lostandfoundlist',
        component :LostandfoundListComponent,
        canActivate :[adminGuard]
    },
    {
        path:'admin/lostandfoundlist/editlostandfound/:type/:id',
        component :EditLostandfoundComponent,
        canActivate :[adminGuard]
    },
    {
        path : 'Login',
        component : LoginComponent
    }
];
