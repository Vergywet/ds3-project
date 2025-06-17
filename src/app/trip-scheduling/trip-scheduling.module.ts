import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TripSchedulingPageRoutingModule } from './trip-scheduling-routing.module';

import { TripSchedulingPage } from './trip-scheduling.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TripSchedulingPageRoutingModule
  ],
  declarations: [TripSchedulingPage]
})
export class TripSchedulingPageModule {}
