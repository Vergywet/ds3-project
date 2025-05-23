import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.loadUserProfile();
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

  async logout() {
    try {
      await this.afAuth.signOut();
      await this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}
