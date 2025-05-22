import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
   standalone: false,
})
export class NotificationPage {
  notifications = [
    {
      id: 1,
      title: 'New Message',
      message: 'You have received a new message from admin.',
      time: '5 mins ago',
      icon: 'mail-outline',
      read: false,
    },
    {
      id: 2,
      title: 'Password Changed',
      message: 'Your password was successfully updated.',
      time: '2 hours ago',
      icon: 'lock-closed-outline',
      read: true,
    },
    {
      id: 3,
      title: 'System Update',
      message: 'App version 2.1.0 is now available.',
      time: 'Yesterday',
      icon: 'cloud-download-outline',
      read: false,
    }
  ];

  markAsRead(notification: any) {
    notification.read = true;
  }

  clearAll() {
    this.notifications = [];
  }
}
