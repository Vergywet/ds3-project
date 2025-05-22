import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerateReportsPage } from './generate-reports.page';

const routes: Routes = [
  {
    path: '',
    component: GenerateReportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenerateReportsPageRoutingModule {}
