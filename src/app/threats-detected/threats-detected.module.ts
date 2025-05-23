import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThreatsDetectedPageRoutingModule } from './threats-detected-routing.module';

import { ThreatsDetectedPage } from './threats-detected.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThreatsDetectedPageRoutingModule
  ],
  declarations: [ThreatsDetectedPage]
})
export class ThreatsDetectedPageModule {}
