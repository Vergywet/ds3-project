import { Component, OnInit, inject, Injector } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController, LoadingController } from '@ionic/angular';
import { FirebaseError } from 'firebase/app';
import { runInInjectionContext } from '@angular/core';

interface UserProfile {
  fullName: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {
  fullName: string = '';
  email: string = '';
  role: string = '';
  userId: string = '';
  private injector = inject(Injector);

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    runInInjectionContext(this.injector, () => {
      this.loadProfile();
    });
  }

  private async loadProfile() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading profile...'
    });
    await loading.present();

    try {
      await runInInjectionContext(this.injector, async () => {
        const user = await this.afAuth.currentUser;
        if (!user) {
          throw new Error('No user logged in');
        }

        this.userId = user.uid;
        const docSnapshot = await this.firestore
          .collection('users')
          .doc(user.uid)
          .get()
          .toPromise();

        if (!docSnapshot?.exists) {
          throw new Error('User data not found');
        }

        const data = docSnapshot.data() as UserProfile;
        this.fullName = data.fullName;
        this.email = data.email;
        this.role = data.role;
      });
    } catch (error: unknown) {
      console.error('Profile loading error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to load profile';
      await this.showAlert('Error', errorMessage);
    } finally {
      await loading.dismiss();
    }
  }

  async updateProfile() {
    if (!this.userId) {
      await this.showAlert('Error', 'User ID not found');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Updating profile...'
    });
    await loading.present();

    try {
      const updateData: Partial<UserProfile> = {
        fullName: this.fullName,
        email: this.email
      };

      await this.firestore
        .collection('users')
        .doc(this.userId)
        .update(updateData);

      const user = await this.afAuth.currentUser;
      if (user && user.email !== this.email) {
        await user.updateEmail(this.email);
      }

      await this.showAlert('Success', 'Profile updated successfully');
    } catch (error: unknown) {
      console.error('Update error:', error);
      const errorMessage = error instanceof FirebaseError ?
        this.getFirebaseErrorMessage(error.code) :
        'Failed to update profile';
      await this.showAlert('Error', errorMessage);
    } finally {
      await loading.dismiss();
    }
  }

  private getFirebaseErrorMessage(code: string): string {
    switch (code) {
      case 'auth/requires-recent-login':
        return 'Please log in again to update your email';
      case 'auth/email-already-in-use':
        return 'This email is already in use';
      case 'auth/invalid-email':
        return 'Invalid email format';
      default:
        return 'Failed to update profile';
    }
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
