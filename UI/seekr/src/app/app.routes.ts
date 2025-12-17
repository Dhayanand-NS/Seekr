import { Routes } from '@angular/router';
import { MapComponent } from './shared/map/map.component';
import { LostandfoudComponent } from './features/lostandfound/lostandfound.component';
import { HomeComponent } from './features/home/home.component';
import { SubmissionsComponent } from './features/submissions/submissions.component';
import { MatchfoundComponent } from './features/matchfound/matchfound.component';
import { LostandfoundListComponent } from './features/lostandfound-list/lostandfound-list.component';
import { EditLostandfoundComponent } from './features/edit-lostandfound/edit-lostandfound.component';
import { LoginComponent } from './features/auth/login/login.component';

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
        component:LostandfoudComponent
    },
    {
        path:'submissions',
        component:SubmissionsComponent
    },
    {
        path:'matchfound/:latitude/:longitude/:matchedId/:type',
        component:MatchfoundComponent
    },
    {
        path:'admin/lostandfoundlist',
        component :LostandfoundListComponent
    },
    {
        path:'admin/lostandfoundlist/editlostandfound/:type/:id',
        component :EditLostandfoundComponent
    },
    {
        path : 'Login',
        component : LoginComponent
    }
];
