import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { Container } from './container/container';
import { Dashboard } from './pages/dashboard/dashboard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'cadastro',
    component: Cadastro,
  },
  {
    path: 'medform',
    component: Container,
  },
  {
    path: 'dashboard',
    component: Dashboard,
  },
  
];