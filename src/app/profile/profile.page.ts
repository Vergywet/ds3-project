import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';

interface UserProfile {
  fullName: string;
  email: string;
  role?: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit, OnDestroy {
  user: UserProfile = {
    fullName: '',
    email: '',
  };

  uid: string = '';
  private profileSubscription?: Subscription;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  async loadUserProfile() {
    try {
      const authUser = await this.afAuth.currentUser;

      if (!authUser) {
        await this.showAlert('Error', 'No authenticated user found');
        return;
      }

      this.uid = authUser.uid;
      this.user.email = authUser.email || '';

      const docRef = this.firestore.collection('users').doc<UserProfile>(this.uid);
      this.profileSubscription = docRef.valueChanges().subscribe({
        next: (data) => {
          if (data) {
            this.user.fullName = data.fullName || '';
            this.user.role = data.role || '';
          } else {
            console.warn('User document not found in Firestore');
          }
        },
        error: async (error) => {
          console.error('Profile load error:', error);
          await this.showAlert('Error', 'Failed to load profile data');
        },
      });
    } catch (error) {
      console.error('Load user profile error:', error);
      await this.showAlert('Error', 'Could not load user profile');
    }
  }

  async updateProfile() {
    if (!this.uid) {
      await this.showAlert('Error', 'No user ID found');
      return;
    }

    try {
      await this.firestore.collection('users').doc(this.uid).set(
        {
          fullName: this.user.fullName,
          email: this.user.email,
        },
        { merge: true }
      );

      await this.showAlert('Success', 'Profile updated successfully');
    } catch (error) {
      console.error('Update error:', error);
      await this.showAlert('Error', 'Failed to update profile');
    }
  }

  private async showAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  ngOnDestroy() {
    if (this.profileSubscription) {
      this.profileSubscription.unsubscribe();
    }
  }
}
