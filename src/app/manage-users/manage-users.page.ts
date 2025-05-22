import { Component, OnInit, inject, Injector } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { runInInjectionContext } from '@angular/core';

interface User {
  id: string;
  email: string;
  role: string;
  fullName?: string;
}

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.page.html',
  styleUrls: ['./manage-users.page.scss'],
  standalone: false,
})
export class ManageUsersPage implements OnInit {
  users$: Observable<User[]> = new Observable<User[]>();
  private injector = inject(Injector);

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private alertController: AlertController,
    private location: Location
  ) {}

  ngOnInit() {
    this.users$ = runInInjectionContext(this.injector, () => {
      return this.firestore.collection('users').snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Omit<User, 'id'>;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
    });
  }

  async editUser(user: User) {
    const alert = await this.alertController.create({
      header: 'Edit User',
      inputs: [
        {
          name: 'fullName',
          type: 'text',
          placeholder: 'Full Name',
          value: user.fullName || ''
        },
        {
          name: 'role',
          type: 'text',
          placeholder: 'Role',
          value: user.role
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Save',
          handler: async (data) => {
            try {
              await runInInjectionContext(this.injector, async () => {
                await this.firestore.collection('users').doc(user.id).update({
                  fullName: data.fullName,
                  role: data.role
                });
              });
            } catch (error) {
              console.error('Error updating user:', error);
              this.showAlert('Error', 'Failed to update user');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async toggleLock(user: User) {
    try {
      await runInInjectionContext(this.injector, async () => {
        const isLocked = user.role === 'Locked';
        const newRole = isLocked ? 'User' : 'Locked';
        await this.firestore.collection('users').doc(user.id).update({ role: newRole });
      });
    } catch (error) {
      console.error('Error toggling lock:', error);
      this.showAlert('Error', 'Failed to update user status');
    }
  }

  async deleteUser(user: User) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: `Are you sure you want to delete ${user.fullName || user.email}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: async () => {
            try {
              await runInInjectionContext(this.injector, async () => {
                await this.firestore.collection('users').doc(user.id).delete();
              });
            } catch (error) {
              console.error('Error deleting user:', error);
              this.showAlert('Error', 'Failed to delete user');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async logout() {
    try {
      await runInInjectionContext(this.injector, async () => {
        await this.afAuth.signOut();
        await this.router.navigate(['/login']);
      });
    } catch (error) {
      console.error('Logout error:', error);
      this.showAlert('Error', 'Failed to logout');
    }
  }

  goBack() {
    this.location.back();
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
