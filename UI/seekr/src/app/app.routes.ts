import { Routes } from '@angular/router';
import { MapComponent } from './shared/map/map.component';
import { LostandfoudComponent } from './features/lostandfoud/lostandfoud.component';
import { HomeComponent } from './features/home/home.component';
import { SubmissionsComponent } from './features/submissions/submissions.component';

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
    }
];
