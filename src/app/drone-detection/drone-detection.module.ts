import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DroneDetectionPageRoutingModule } from './drone-detection-routing.module';

import { DroneDetectionPage } from './drone-detection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DroneDetectionPageRoutingModule
  ],
  declarations: [DroneDetectionPage]
})
export class DroneDetectionPageModule {}
