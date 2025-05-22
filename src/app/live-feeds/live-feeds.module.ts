import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LiveFeedsPageRoutingModule } from './live-feeds-routing.module';

import { LiveFeedsPage } from './live-feeds.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LiveFeedsPageRoutingModule
  ],
  declarations: [LiveFeedsPage]
})
export class LiveFeedsPageModule {}
