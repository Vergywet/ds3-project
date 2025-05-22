import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LiveFeedsPage } from './live-feeds.page';

const routes: Routes = [
  {
    path: '',
    component: LiveFeedsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LiveFeedsPageRoutingModule {}
