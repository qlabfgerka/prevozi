import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from './filters.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TimeDialogModule } from '../dialogs/time-dialog/time-dialog.module';

@NgModule({
  declarations: [FiltersComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, TimeDialogModule],
  exports: [FiltersComponent],
})
export class FiltersModule {}
