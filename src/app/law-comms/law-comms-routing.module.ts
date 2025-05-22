import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LawCommsPage } from './law-comms.page';

const routes: Routes = [
  {
    path: '',
    component: LawCommsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LawCommsPageRoutingModule {}
