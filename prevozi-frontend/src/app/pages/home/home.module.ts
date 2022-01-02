import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { MenuDialogModule } from 'src/app/shared/components/dialogs/menu-dialog/menu-dialog.module';
import { FiltersModule } from 'src/app/shared/components/filters/filters.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MenuDialogModule,
    FiltersModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
