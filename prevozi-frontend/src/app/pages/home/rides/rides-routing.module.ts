import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RidesPage } from './rides.page';

const routes: Routes = [
  {
    path: '',
    component: RidesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RidesPageRoutingModule {}
