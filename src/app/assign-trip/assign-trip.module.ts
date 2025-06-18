import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignTripPageRoutingModule } from './assign-trip-routing.module';

import { AssignTripPage } from './assign-trip.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignTripPageRoutingModule
  ],
  declarations: [AssignTripPage]
})
export class AssignTripPageModule {}
