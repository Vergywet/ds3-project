import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicleRegPageRoutingModule } from './vehicle-reg-routing.module';

import { VehicleRegPage } from './vehicle-reg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: VehicleRegPage }])
  ],
  declarations: [VehicleRegPage]
})
export class VehicleRegPageModule {}
import { RouterModule } from '@angular/router';