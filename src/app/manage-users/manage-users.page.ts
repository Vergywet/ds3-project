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

  async toggleLock(user: User) {
    const isCurrentlyLocked = user.role === 'Locked';
    try {
      const confirmAlert = await this.alertController.create({
        header: isCurrentlyLocked ? 'Unlock Account' : 'Lock Account',
        message: `Are you sure you want to ${isCurrentlyLocked ? 'unlock' : 'lock'} this account?`,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Confirm',
            handler: async () => {
              try {
                await runInInjectionContext(this.injector, async () => {
                  const previousRole = localStorage.getItem(`previousRole_${user.id}`) || 'User';
                  if (!isCurrentlyLocked) {
                    // Store current role before locking
                    localStorage.setItem(`previousRole_${user.id}`, user.role);
                  }
                  await this.firestore.collection('users').doc(user.id).update({
                    role: isCurrentlyLocked ? previousRole : 'Locked'
                  });
                });
                await this.showAlert(
                  'Success', 
                  `Account has been ${isCurrentlyLocked ? 'unlocked' : 'locked'}`
                );
              } catch (error) {
                console.error('Error toggling lock:', error);
                await this.showAlert('Error', 'Failed to update account status');
              }
            }
          }
        ]
      });
      await confirmAlert.present();
    } catch (error) {
      console.error('Error showing confirmation:', error);
      await this.showAlert('Error', 'Failed to process request');
    }
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
              await this.showAlert('Success', 'User updated successfully');
            } catch (error) {
              console.error('Error updating user:', error);
              await this.showAlert('Error', 'Failed to update user');
            }
          }
        }
      ]
    });
    await alert.present();
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
                localStorage.removeItem(`previousRole_${user.id}`);
              });
              await this.showAlert('Success', 'User deleted successfully');
            } catch (error) {
              console.error('Error deleting user:', error);
              await this.showAlert('Error', 'Failed to delete user');
            }
          }
        }
      ]
    });
    await alert.present();
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
