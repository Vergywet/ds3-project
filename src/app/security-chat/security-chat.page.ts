import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService, Message } from '../shared/message.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-security-chat',
  templateUrl: './security-chat.page.html',
  styleUrls: ['./security-chat.page.scss'],
  standalone: false,
})
export class SecurityChatPage implements OnInit, OnDestroy {
  messages: Message[] = [];
  newMessage = '';

  private messagesSubscription!: Subscription;

  constructor(private messageService: MessageService, private location: Location) {}

  ngOnInit() {
    this.messagesSubscription = this.messageService.getMessages().subscribe((msgs) => {
      this.messages = msgs;
      setTimeout(() => {
        const content = document.querySelector('ion-content');
        if (content) {
          content.scrollToBottom(300);
        }
      }, 100);
    });
  }

  ngOnDestroy() {
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
  }

  sendMessage() {
    const text = this.newMessage.trim();
    if (text) {
      this.messageService.sendMessage('security', text);
      this.newMessage = '';
    }
  }

  goBack() {
    this.location.back();
  }
}
