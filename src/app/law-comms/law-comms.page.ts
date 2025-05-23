import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-law-comms',
  templateUrl: './law-comms.page.html',
  styleUrls: ['./law-comms.page.scss'],
  standalone:false,
})
export class LawCommsPage {
  messages = [
    {
      id: '1',
      sender: 'self',
      text: "We've identified a threat near the west perimeter. Immediate response requested.",
    },
    {
      id: '2',
      sender: 'other',
      text: 'Understood. Officers are en route to intercept.',
    },
    {
      id: '3',
      sender: 'self',
      text: 'Please provide live updates on location and response status.',
    },
  ];

  inputMessage = '';

  @ViewChild(IonContent) content!: IonContent;

  constructor(private navCtrl: NavController) {}

  goBack() {
    this.navCtrl.back();
  }

  sendMessage() {
    if (this.inputMessage.trim() === '') return;
    this.messages.push({
      id: (this.messages.length + 1).toString(),
      sender: 'self',
      text: this.inputMessage.trim(),
    });
    this.inputMessage = '';

    setTimeout(() => {
      this.content.scrollToBottom(300);
    }, 100);
  }
}
