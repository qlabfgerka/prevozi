import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RideComponent } from './ride.component';
import { IonicModule } from '@ionic/angular';
import { ConfirationDialogModule } from '../dialogs/confiration-dialog/confiration-dialog.module';
import { RateDialogModule } from '../dialogs/rate-dialog/rate-dialog.module';

@NgModule({
  declarations: [RideComponent],
  imports: [
    CommonModule,
    IonicModule,
    ConfirationDialogModule,
    RateDialogModule,
  ],
  exports: [RideComponent],
})
export class RideModule {}
