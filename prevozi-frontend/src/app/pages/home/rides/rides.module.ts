import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RidesPageRoutingModule } from './rides-routing.module';

import { RidesPage } from './rides.page';
import { ReservationsModule } from 'src/app/shared/components/reservations/reservations.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RidesPageRoutingModule,
    ReservationsModule,
  ],
  declarations: [RidesPage],
})
export class RidesPageModule {}
