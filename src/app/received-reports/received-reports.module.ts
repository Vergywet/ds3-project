import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceivedReportsPageRoutingModule } from './received-reports-routing.module';

import { ReceivedReportsPage } from './received-reports.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceivedReportsPageRoutingModule
  ],
  declarations: [ReceivedReportsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReceivedReportsPageModule {}
