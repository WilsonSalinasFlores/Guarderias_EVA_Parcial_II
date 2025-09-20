import { Routes } from '@angular/router';
import { Cuidadores } from './Components/cuidadores/cuidadores';
import {  GestionComponent } from './Components/gestion/gestion';
import { NinosComponent } from './Components/ninos/ninos';

export const routes: Routes = [
  { 
    path: 'cuidadores',
     component: Cuidadores },
  { 
    path: 'gestion',
    component: GestionComponent },
  { 
    path: 'niños',
    component: NinosComponent },
  { 
    path: '',
    redirectTo: '/gestion',
    pathMatch: 'full' }
];

