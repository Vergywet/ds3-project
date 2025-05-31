import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecurityChatPage } from './security-chat.page';

const routes: Routes = [
  {
    path: '',
    component: SecurityChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityChatPageRoutingModule {}
