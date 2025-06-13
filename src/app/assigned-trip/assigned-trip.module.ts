import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignedTripPageRoutingModule } from './assigned-trip-routing.module';

import { AssignedTripPage } from './assigned-trip.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignedTripPageRoutingModule,
    AssignedTripPage
  ]
})
export class AssignedTripPageModule {}
