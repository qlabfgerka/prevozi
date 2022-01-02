import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuDialogComponent } from './menu-dialog.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [MenuDialogComponent],
  imports: [CommonModule, IonicModule],
  exports: [MenuDialogComponent],
})
export class MenuDialogModule {}
