import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeDialogComponent } from './time-dialog.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TimeDialogComponent],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [TimeDialogComponent],
})
export class TimeDialogModule {}
