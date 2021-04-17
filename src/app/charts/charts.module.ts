import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsPage } from './charts.page';

import { ChartsPageRoutingModule } from './charts-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ChartsPageRoutingModule
  ],
  declarations: [ChartsPage]
})
export class ChartsPageModule {}
