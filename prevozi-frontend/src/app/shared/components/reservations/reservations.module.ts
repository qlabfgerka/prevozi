import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsComponent } from './reservations.component';
import { IonicModule } from '@ionic/angular';
import { RateDialogModule } from '../dialogs/rate-dialog/rate-dialog.module';

@NgModule({
  declarations: [ReservationsComponent],
  imports: [CommonModule, IonicModule, RateDialogModule],
  exports: [ReservationsComponent],
})
export class ReservationsModule {}
