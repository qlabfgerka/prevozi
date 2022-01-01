import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('../account/profile/profile.module').then(
        (m) => m.ProfilePageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
