import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TripSchedulingPage } from './trip-scheduling.page';

const routes: Routes = [
  {
    path: '',
    component: TripSchedulingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TripSchedulingPageRoutingModule {}
