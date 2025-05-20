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

  // ✅ Controls password visibility in the template
  showPassword: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private injector: Injector,
    private ngZone: NgZone
  ) {}

  ngOnInit() {}

 // ✅ Toggle password field visibility
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
          alert(`Login successful as ${role}`);

          switch (role) {
            case 'Admin':
              this.router.navigateByUrl('/admin-dashboard', { replaceUrl: true });
              break;
            case 'Security Personnel':
              this.router.navigateByUrl('/security-personnel', { replaceUrl: true });
              break;
            case 'Law Enforcement Officer':
              this.router.navigateByUrl('/law-dashboard', { replaceUrl: true });
              break;
            default:
              alert('Unknown role. Please contact the administrator.');
          }
        } else {
          alert('User role not found.');
        }
      });
    } catch (error: any) {
      console.error('Login error:', error);
      alert(error.message);
    }
  }
}
