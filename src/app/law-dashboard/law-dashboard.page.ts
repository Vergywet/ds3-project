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
      icon: 'document-text-outline',
      title: 'Received Reports',
      description: 'Monitor and control drone operations',
      color: 'primary',
      route: '/received-reports'
    },
    {
      icon: 'shield-outline',
      title: 'Threats Detected',
      description: 'Monitor detected suspicious activities',
      color: 'danger',
      route: '/threats-detected'
    },
    {
      icon: 'chatbox-ellipses-outline',
      title: 'Communicate with Security',
      description: 'Send updates or urgent requests',
      color: 'tertiary',
      route: '/law-comms'
    },
    {
      icon: 'bar-chart-outline',
      title: 'Generate Reports',
      description: 'Create detailed incident reports',
      color: 'success',
      route: '/generate-reports'
    },
    {
      icon: 'settings-outline',
      title: 'System Settings',
      description: 'Change language, theme, or preferences',
      color: 'medium',
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
