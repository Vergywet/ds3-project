import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-law-dashboard',
  templateUrl: './law-dashboard.page.html',
  styleUrls: ['./law-dashboard.page.scss'],
  standalone:false,
})
export class LawDashboardPage implements OnInit {

  menuItems = [
    {
      icon: 'mail-outline',
      title: 'Received Incident Report',
      description: 'Review and manage incoming incident reports',
      color: 'primary',
      route: '/received-reports'
    },
    {
      icon: 'warning-outline',
      title: 'Threats Overview',
      description: 'Monitor and assess current threats',
      color: 'primary',
      route: '/threats-overview'
    },
    {
      icon: 'chatbubble-ellipses-outline',
      title: 'Communicate with Security',
      description: 'Send messages and alerts to security personnel',
      color: 'primary',
      route: '/law-comms'
    },
    {
      icon: 'notifications-outline',
      title: 'Alerts Overview',
      description: 'View active and past alerts',
      color: 'primary',
      route: '/alerts-overview'
    },
    {
      icon: 'time-outline',
      title: 'History',
      description: 'Access historical incident and alert data',
      color: 'primary',
      route: '/history'
    },
    {
      icon: 'settings-outline',
      title: 'System Settings',
      description: 'Configure system preferences and settings',
      color: 'primary',
      route: '/system-settings'
    }
  ];

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  async logout() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Logout',
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Logout',
          handler: () => {
            this.navCtrl.navigateRoot('/login');
          }
        }
      ]
    });

    await alert.present();
  }

  navigateTo(item: any) {
    this.navCtrl.navigateForward(item.route);
  }
}
