import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-threats-detected',
  templateUrl: './threats-detected.page.html',
  styleUrls: ['./threats-detected.page.scss'],
  standalone:false,
})
export class ThreatsDetectedPage {
  constructor(
    private navCtrl: NavController,
    private alertController: AlertController
  ) {}

  threatData = [
    {
      title: 'Intruder Spotted',
      location: 'Gate 2 - West Entrance',
      time: '10:22 AM',
      status: 'New',
      statusColor: 'warning',
      textColor: '#000000',
    },
    {
      title: 'Unauthorized Drone',
      location: 'Airspace Sector B',
      time: '09:50 AM',
      status: 'Investigating',
      statusColor: 'medium',
      textColor: '#ffffff',
    },
    {
      title: 'Fire Alert',
      location: 'Warehouse 5',
      time: '08:15 AM',
      status: 'Resolved',
      statusColor: 'success',
      textColor: '#ffffff',
    },
    {
      title: 'System Malfunction',
      location: 'Control Room',
      time: '11:30 AM',
      status: 'New',
      statusColor: 'danger',
      textColor: '#ffffff',
    },
  ];

  goBack() {
    this.navCtrl.back();
  }

  async confirmThreat(title: string) {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: `Confirmed threat: ${title}`,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async dismissThreat(title: string) {
    const alert = await this.alertController.create({
      header: 'Dismiss',
      message: `Dismissed threat: ${title}`,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
