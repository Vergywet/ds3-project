import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerateReportsPageRoutingModule } from './generate-reports-routing.module';

import { GenerateReportsPage } from './generate-reports.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerateReportsPageRoutingModule
  ],
  declarations: [GenerateReportsPage]
})
export class GenerateReportsPageModule {}
