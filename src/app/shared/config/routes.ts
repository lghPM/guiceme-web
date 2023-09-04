import { PrincipalLayoutComponent } from '../layout/principal-layout/principal-layout.component';
import { NAV } from './global';
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: NAV.login,
    pathMatch: 'full',
  },
  {
    path: NAV.login,
    loadChildren: () =>
      import('../../modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: NAV.home,
    component: PrincipalLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../../modules/home/home.module').then((m) => m.HomeModule),
        outlet: 'contentido',
      },
    ],
  },
];
