import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverdashboardPage } from './driverdashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DriverdashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverdashboardPageRoutingModule {}
