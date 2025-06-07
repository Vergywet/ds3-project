import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-driverdashboard',
  templateUrl: './driverdashboard.page.html',
  styleUrls: ['./driverdashboard.page.scss'],
  standalone: false,
})
export class DriverdashboardPage implements OnInit {

  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  openRoute() {
    // Open Google Maps with a route
    window.open('https://www.google.com/maps/dir/?api=1&origin=current+location&destination=Your+Destination', '_blank');
  }

  openLiveFeed() {
    // Navigate to live feed page (replace with actual route)
    this.navCtrl.navigateForward('/live-feed');
  }

  triggerPanic() {
    alert('⚠️ Panic Alert Sent to Security Team!');
    // Optional: Integrate real panic alert logic (API or WebSocket)
  }

  openChat() {
    // Navigate to chat page (replace with actual route)
    this.navCtrl.navigateForward('/chat');
  }

  logout() {
    // Handle logout and navigate to login screen
    this.navCtrl.navigateRoot('/login');
  }
}
