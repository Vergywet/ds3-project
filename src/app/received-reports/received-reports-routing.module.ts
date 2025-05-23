import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceivedReportsPage } from './received-reports.page';

const routes: Routes = [
  {
    path: '',
    component: ReceivedReportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceivedReportsPageRoutingModule {}
