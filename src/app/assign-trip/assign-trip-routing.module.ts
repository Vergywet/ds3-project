import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignTripPage } from './assign-trip.page';

const routes: Routes = [
  {
    path: '',
    component: AssignTripPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignTripPageRoutingModule {}
