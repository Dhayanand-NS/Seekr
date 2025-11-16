import { Routes } from '@angular/router';
import { MapComponent } from './shared/map/map.component';
import { LostandfoudComponent } from './features/lostandfound/lostandfound.component';
import { HomeComponent } from './features/home/home.component';
import { SubmissionsComponent } from './features/submissions/submissions.component';
import { MatchfoundComponent } from './features/matchfound/matchfound.component';

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
        path:'matchfound/:latitude/:longitude',
        component:MatchfoundComponent
    }
];
