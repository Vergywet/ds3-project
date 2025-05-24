import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DroneDetectionPage } from './drone-detection.page';

const routes: Routes = [
  {
    path: '',
    component: DroneDetectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DroneDetectionPageRoutingModule {}
