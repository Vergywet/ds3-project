import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LawDashboardPage } from './law-dashboard.page';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LawDashboardPage,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LawDashboardPageRoutingModule {}
