import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from 'src/app/guards/role/role.guard';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'add',
    loadChildren: () =>
      import('./rides/add/add.module').then((m) => m.AddPageModule),
    canActivate: [RoleGuard],
    data: { role: 'OFFER' },
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('../account/profile/profile.module').then(
        (m) => m.ProfilePageModule
      ),
  },
  {
    path: 'rides/track/:id',
    loadChildren: () =>
      import('./rides/location/location.module').then(
        (m) => m.LocationPageModule
      ),
  },
  {
    path: 'rides/:id',
    loadChildren: () =>
      import('./rides/rides.module').then((m) => m.RidesPageModule),
    canActivate: [RoleGuard],
    data: { role: 'USE' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
