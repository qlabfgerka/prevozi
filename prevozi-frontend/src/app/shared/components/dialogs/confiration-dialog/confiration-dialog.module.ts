import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirationDialogComponent } from './confiration-dialog.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ConfirationDialogComponent],
  imports: [CommonModule, IonicModule],
  exports: [ConfirationDialogComponent],
})
export class ConfirationDialogModule {}
