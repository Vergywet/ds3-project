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

  threatData: { title: string; location: string; time: string; status: string; statusColor: string; textColor: string; }[] = [
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
    // Update the threat status to Confirmed
    const threatIndex = this.threatData.findIndex(threat => threat.title === title);
    if (threatIndex !== -1) {
      this.threatData[threatIndex].status = 'Confirmed';
      this.threatData[threatIndex].statusColor = 'success';
      this.threatData[threatIndex].textColor = '#ffffff';
    }

    const alert = await this.alertController.create({
      header: 'Confirm',
      message: `Confirmed threat: ${title}`,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async dismissThreat(title: string) {
    // Remove the threat with the matching title
    this.threatData = this.threatData.filter((threat) => threat.title !== title);

    const alert = await this.alertController.create({
      header: 'Dismiss',
      message: `Dismissed threat: ${title}`,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
        },
      ],
    });
    await alert.present();
  }
}
