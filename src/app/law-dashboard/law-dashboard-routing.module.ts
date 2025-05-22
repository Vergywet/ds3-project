import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LawDashboardPage } from './law-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: LawDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LawDashboardPageRoutingModule {}
