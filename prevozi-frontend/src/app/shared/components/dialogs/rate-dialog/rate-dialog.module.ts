import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RateDialogComponent } from './rate-dialog.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [RateDialogComponent],
  imports: [CommonModule, IonicModule],
  exports: [RateDialogComponent],
})
export class RateDialogModule {}
