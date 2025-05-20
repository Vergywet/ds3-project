import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LawDashboardPageRoutingModule } from './law-dashboard-routing.module';

import { LawDashboardPage } from './law-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LawDashboardPageRoutingModule
  ],
  declarations: [LawDashboardPage]
})
export class LawDashboardPageModule {}
