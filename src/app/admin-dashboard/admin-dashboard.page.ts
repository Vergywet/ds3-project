import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular'; // <-- Add NavController here


interface UserData {
  fullName: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
  standalone: false,
})
export class AdminDashboardPage implements OnInit {
  userData: UserData | null = null;

  constructor(
    private location: Location,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private alertController: AlertController,
    private navCtrl: NavController // <-- Inject here
  ) { }

  ngOnInit() {
    this.loadUserProfile();
     this.checkAuthState();
  }

  private async loadUserProfile() {
    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        const userDoc = await this.firestore.collection('users').doc(user.uid).get().toPromise();
        if (userDoc?.exists) {
          this.userData = userDoc.data() as UserData;
        }
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  }

  async viewProfile() {
    if (!this.userData) return;

    const alert = await this.alertController.create({
      header: 'Admin Profile',
      message: `
        <div class="profile-info">
          <p><strong>Full Name:</strong> ${this.userData.fullName}</p>
          <p><strong>Email:</strong> ${this.userData.email}</p>
          <p><strong>Role:</strong> ${this.userData.role}</p>
        </div>
      `,
      buttons: ['OK']
    });

    await alert.present();
  }

  goBack() {
    this.location.back();
  }
    goToDashboard() {
    this.navCtrl.navigateRoot('/admin-dashboard');
  }

  async logout() {
    try {
      await this.afAuth.signOut();
      await this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout error:', error);
    }
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
  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
