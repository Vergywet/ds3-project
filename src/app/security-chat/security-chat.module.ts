import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SecurityChatPageRoutingModule } from './security-chat-routing.module';

import { SecurityChatPage } from './security-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SecurityChatPageRoutingModule
  ],
  declarations: [SecurityChatPage]
})
export class SecurityChatPageModule {}
