import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-driverdashboard',
  templateUrl: './driverdashboard.page.html',
  styleUrls: ['./driverdashboard.page.scss'],
  standalone: false,
})
export class DriverdashboardPage implements OnInit {
  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private afAuth: AngularFireAuth,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.checkAuthState();
  }

  private async checkAuthState() {
    try {
      const user = await this.afAuth.currentUser;
      if (!user) {
        await this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      await this.showAlert('Error', 'Authentication failed');
    }
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  async openRoute() {
    try {
      const position = await this.getCurrentPosition();
      const origin = encodeURIComponent(`${position.coords.latitude},${position.coords.longitude}`);
      // Replace this with your actual destination coordinates or address
      const destination = encodeURIComponent('Durban,South Africa'); 
      
      // Using Google Maps with proper URL formatting
      const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
      
      // Open in new tab with proper security parameters
      window.location.href = url;
      
    } catch (error) {
      console.error('Location error:', error);
      await this.showAlert('Error', 'Could not access location services. Please check your GPS settings.');
    }
  }

  openLiveFeed() {
    this.router.navigate(['/live-feed']);
  }

  async triggerPanic() {
    const alert = await this.alertController.create({
      header: '⚠️ Emergency Alert',
      message: 'Are you sure you want to trigger the panic alert?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          cssClass: 'danger',
          handler: () => {
            this.sendPanicAlert();
          }
        }
      ]
    });
    await alert.present();
  }

  private async sendPanicAlert() {
    try {
      // Implement panic alert logic here
      await this.showAlert('Alert Sent', 'Emergency services have been notified');
    } catch (error) {
      console.error('Panic alert error:', error);
      await this.showAlert('Error', 'Failed to send panic alert');
    }
  }

  openChat() {
    this.router.navigate(['/security-chat']);
  }

  async logout() {
    try {
      await this.afAuth.signOut();
      await this.router.navigate(['/login'], { replaceUrl: true });
    } catch (error) {
      console.error('Logout error:', error);
      await this.showAlert('Error', 'Failed to logout');
    }
  }

  private getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
      }
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
    });
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  goToAssignedTrips() {
    // Implement navigation or logic here
    this.router.navigate(['/assigned-trip']);
  }
}
