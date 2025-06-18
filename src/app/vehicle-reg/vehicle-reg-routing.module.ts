import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleRegPage } from './vehicle-reg.page';

const routes: Routes = [
  {
    path: '',
    component: VehicleRegPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleRegPageRoutingModule {}
