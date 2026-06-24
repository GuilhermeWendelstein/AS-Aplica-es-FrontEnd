import { Routes } from '@angular/router';
import { Container } from './container/container';

export const routes: Routes = [
  {
    path: 'medform',
    component: Container,
  },
  {
    path: '',
    redirectTo: 'medform',
    pathMatch: 'full',
  },
];