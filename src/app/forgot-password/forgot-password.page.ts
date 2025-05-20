import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: false
})
export class ForgotPasswordPage {
  email: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  async resetPassword() {
    try {
      await this.afAuth.sendPasswordResetEmail(this.email);
      alert('Password reset email sent. Please check your inbox.');
      this.router.navigateByUrl('/login');
    } catch (error: any) {
      console.error('Password reset error:', error);
      alert(error.message);
    }
  }
}
