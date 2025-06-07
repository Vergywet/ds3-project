import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriverdashboardPageRoutingModule } from './driverdashboard-routing.module';

import { DriverdashboardPage } from './driverdashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DriverdashboardPageRoutingModule
  ],
  declarations: [DriverdashboardPage]
})
export class DriverdashboardPageModule {}
