import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LawCommsPageRoutingModule } from './law-comms-routing.module';

import { LawCommsPage } from './law-comms.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LawCommsPageRoutingModule
  ],
  declarations: [LawCommsPage]
})
export class LawCommsPageModule {}
