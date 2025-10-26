import { Routes } from '@angular/router';
import { MapComponent } from './shared/map/map.component';
import { LostandfoudComponent } from './features/lostandfoud/lostandfoud.component';

export const routes: Routes = [
    {
        path:'map',
        component: MapComponent
    },
    {
        path:'lostandfound',
        component:LostandfoudComponent
    }
];
