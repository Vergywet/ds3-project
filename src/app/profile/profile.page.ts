import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController, LoadingController } from '@ionic/angular';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {
  profileForm: FormGroup;
  loading = true;

  // For password change
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {
    this.profileForm = this.fb.group({
      fullname: ['', Validators.required],
      email: [{ value: '', disabled: true }, Validators.required],
    });
  }

  async ngOnInit() {
    const user = await this.afAuth.currentUser;
    if (user) {
      // Get additional profile info from Firestore if you store it there
      const userDoc = this.afs.collection('users').doc(user.uid);
      userDoc.valueChanges().subscribe((profile: any) => {
        this.profileForm.patchValue({
          fullname: profile?.fullname || '',
          email: user.email
        });
        this.loading = false;
      });
    }
  }

  async saveProfile() {
    const user = await this.afAuth.currentUser;
    if (!user) return;

    const loading = await this.loadingCtrl.create({ message: 'Saving...' });
    await loading.present();

    try {
      // Update Firestore profile
      await this.afs.collection('users').doc(user.uid).update({
        fullname: this.profileForm.value.fullname
      });
      await loading.dismiss();
      this.showToast('Profile updated!');
    } catch (error) {
      await loading.dismiss();
      this.showToast('Failed to update profile.');
      console.error(error);
    }
  }

  // Password change logic
  async changePassword() {
    const user = await this.afAuth.currentUser;
    if (!user || !this.currentPassword || !this.newPassword || !this.confirmPassword) {
      return this.showToast('Please fill in all password fields.');
    }
    if (this.newPassword !== this.confirmPassword) {
      return this.showToast('New passwords do not match.');
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
      this.showToast('Password updated successfully.');
      this.currentPassword = this.newPassword = this.confirmPassword = '';
    } catch (error) {
      await loading.dismiss();
      this.showToast('Failed to change password. Check your current password.');
      console.error(error);
    }
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 3000, color: 'primary' });
    toast.present();
  }
}
