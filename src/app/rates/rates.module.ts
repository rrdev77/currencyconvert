import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RatesPage } from './rates.page';

import { RatesPageRoutingModule } from './rates-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RatesPageRoutingModule
  ],
  declarations: [RatesPage]
})
export class RatesPageModule {}
