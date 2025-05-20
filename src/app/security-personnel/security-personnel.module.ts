import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SecurityPersonnelPageRoutingModule } from './security-personnel-routing.module';

import { SecurityPersonnelPage } from './security-personnel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SecurityPersonnelPageRoutingModule
  ],
  declarations: [SecurityPersonnelPage]
})
export class SecurityPersonnelPageModule {}
