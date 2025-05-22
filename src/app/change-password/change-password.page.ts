import { Component } from '@angular/core';
// Use AngularFireAuth from compat API
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController, LoadingController } from '@ionic/angular';
// Import firebase for credential creation
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
  standalone: false,
})
export class ChangePasswordPage {
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';

  constructor(
    private afAuth: AngularFireAuth,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  async changePassword() {
    const user = await this.afAuth.currentUser;

    if (!user || !this.currentPassword || !this.newPassword || !this.confirmPassword) {
      await this.showToast('Please fill in all fields.');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      await this.showToast('New passwords do not match.');
      return;
    }

    const loading = await this.loadingCtrl.create({ message: 'Updating password...' });
    await loading.present();

    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email!,
      this.currentPassword
    );

    try {
      await user.reauthenticateWithCredential(credential);
      await user.updatePassword(this.newPassword);
      await loading.dismiss();
      await this.showToast('Password updated successfully.');
      this.currentPassword = this.newPassword = this.confirmPassword = '';
    } catch (error) {
      await loading.dismiss();
      await this.showToast('Failed to change password. Check your current password.');
      console.error('Password change error:', error);
    }
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 3000, color: 'primary' });
    await toast.present();
  }
}