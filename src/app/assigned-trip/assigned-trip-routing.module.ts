import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignedTripPage } from './assigned-trip.page';

const routes: Routes = [
  {
    path: '',
    component: AssignedTripPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignedTripPageRoutingModule {}
