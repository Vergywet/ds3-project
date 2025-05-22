import {
  Component,
  OnInit,
  inject,
  runInInjectionContext,
  NgZone,
  Injector
} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  fullName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  role: string = ''; // ✅ Added role

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private ngZone: NgZone,
    private injector: Injector
  ) {}

  ngOnInit() {}

  async onRegister() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!this.role) {
      alert('Please select a role.');
      return;
    }

    try {
      await this.ngZone.run(async () => {
        const userCredential = await runInInjectionContext(this.injector, () =>
          this.afAuth.createUserWithEmailAndPassword(this.email, this.password)
        );
        const user = userCredential.user;

        if (user) {
          await runInInjectionContext(this.injector, () =>
            user.updateProfile({
              displayName: this.fullName
            })
          );

          await runInInjectionContext(this.injector, () =>
            this.afs.collection('users').doc(user.uid).set({
              uid: user.uid,
              fullName: this.fullName,
              email: this.email,
              role: this.role, // ✅ Save selected role
              createdAt: new Date()
            })
          );

          alert('Registration successful!');
          this.router.navigateByUrl('/home', { replaceUrl: true });
        }
      });
    } catch (error: any) {
      console.error('Registration error:', error);
      alert(error.message);
    }
  }
}
