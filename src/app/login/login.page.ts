import { Component, OnInit, Injector, NgZone, runInInjectionContext } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private injector: Injector,
    private ngZone: NgZone
  ) {}

  ngOnInit() {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async onLogin() {
    try {
      await this.ngZone.run(async () => {
        const userCredential = await runInInjectionContext(this.injector, () =>
          this.afAuth.signInWithEmailAndPassword(this.email, this.password)
        );

        const uid = userCredential.user?.uid;
        if (!uid) throw new Error('User UID not found');

        const userDoc = await runInInjectionContext(this.injector, () =>
          this.afs.collection('users').doc(uid).ref.get()
        );
        const userData = userDoc.data() as { role?: string };

        if (userData?.role) {
          const role = userData.role;

          // ✅ Save role to localStorage so other pages can access it
          localStorage.setItem('userRole', role.toLowerCase());

          // 🚫 Locked account
          if (role === 'Locked') {
            alert('Your account has been locked');
            await this.afAuth.signOut();
            return;
          }

          // ✅ Navigate based on role
          switch (role) {
            case 'Admin':
              await this.router.navigateByUrl('/admin-dashboard', { replaceUrl: true });
              break;
            case 'Security Personnel':
              await this.router.navigateByUrl('/security-personnel', { replaceUrl: true });
              break;
            case 'Law Enforcement Officer':
              await this.router.navigateByUrl('/law-dashboard', { replaceUrl: true });
              break;
            case 'Driver':
              await this.router.navigateByUrl('/driverdashboard', { replaceUrl: true });
              break;
            default:
              alert('Unknown role. Please contact the administrator.');
              await this.afAuth.signOut();
              return;
          }

          // ✅ Success message after navigating
          alert(`Login successful as ${role}`);
        } else {
          alert('User role not found.');
          await this.afAuth.signOut();
        }
      });
    } catch (error: any) {
      console.error('Login error:', error);

      if (error.code === 'auth/user-not-found') {
        alert('User not found. Please check your email.');
      } else if (error.code === 'auth/wrong-password') {
        alert('Incorrect password. Please try again.');
      } else {
        alert(error.message);
      }
    }
  }

  async goToForgotPassword() {
    await this.router.navigate(['/forgot-password']);
  }

  async goToRegister() {
    await this.router.navigate(['/register']);
  }
}
