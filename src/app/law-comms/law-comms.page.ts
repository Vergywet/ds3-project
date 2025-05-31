import { Component, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { MessageService, Message } from '../shared/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-law-comms',
  templateUrl: './law-comms.page.html',
  styleUrls: ['./law-comms.page.scss'],
  standalone: false,
})
export class LawCommsPage {
  messages: Message[] = [];
  inputMessage = '';

  @ViewChild(IonContent) content!: IonContent;

  private messagesSubscription!: Subscription;

  constructor(private navCtrl: NavController, private messageService: MessageService) {}

  ngOnInit() {
    this.messagesSubscription = this.messageService.getMessages().subscribe((msgs) => {
      this.messages = msgs;
      setTimeout(() => {
        this.content.scrollToBottom(300);
      }, 100);
    });
  }

  ngOnDestroy() {
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
  }

  goBack() {
    this.navCtrl.back();
  }

  sendMessage() {
    if (this.inputMessage.trim() === '') return;
    this.messageService.sendMessage('law', this.inputMessage.trim());
    this.inputMessage = '';
  }
}
