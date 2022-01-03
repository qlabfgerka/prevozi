import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyRidesComponent } from './my-rides.component';
import { IonicModule } from '@ionic/angular';
import { RideModule } from '../ride/ride.module';

@NgModule({
  declarations: [MyRidesComponent],
  imports: [CommonModule, IonicModule, RideModule],
  exports: [MyRidesComponent],
})
export class MyRidesModule {}
