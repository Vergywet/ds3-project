import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThreatsDetectedPage } from './threats-detected.page';

const routes: Routes = [
  {
    path: '',
    component: ThreatsDetectedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThreatsDetectedPageRoutingModule {}
