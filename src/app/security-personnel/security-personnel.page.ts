import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController, NavController } from '@ionic/angular';
import { MessageService } from '../shared/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-security-personnel',
  templateUrl: './security-personnel.page.html',
  styleUrls: ['./security-personnel.page.scss'],
  standalone: false,
})
export class SecurityPersonnelPage implements OnInit, OnDestroy {

  menuItems = [
  {
    title: 'Live Feeds & Control Panel',
    description: 'Monitor and control drone operations',
    icon: 'videocam',
    route: '/drone-detection'
  },
  {
    title: 'Threats Detected',
    description: 'Monitor detected suspicious activities',
    icon: 'alert',
    route: '/threats'
  },
  {
    title: 'Communicate with Law Enforcement',
    description: 'Send updates or urgent requests',
    icon: 'call',
    route: '/security-chat?context=professional'
  },
  {
    title: 'Generate Reports',
    description: 'Create detailed incident reports',
    icon: 'document-text',
    route: '/reports'
  },
  {
    title: 'System Settings',
    description: 'Change language, theme, or preferences',
    icon: 'settings',
    route: '/system-settings'
  }
];

  private messagesPrefetchSubscription?: Subscription;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private alertCtrl: AlertController, // <-- Add this
    private navCtrl: NavController,     // <-- Add this
    private alertController: AlertController,
  ) 
  {}
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.checkAuthState();
  }

  navigateTo(item: any) {
    const [path, queryString] = item.route.split('?');
    if (queryString) {
      const queryParams: { [key: string]: string } = {};
      queryString.split('&').forEach((param: string) => {
        const [key, value] = param.split('=');
        queryParams[key] = value;
      });
      this.router.navigate([path], { queryParams });
    } else {
      this.router.navigateByUrl(item.route);
    }
  }
  goToProfile(popover: any) {
    this.router.navigateByUrl('/profile');
    popover.dismiss();
  }

   async logout(popover: any) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Logout',
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Logout',
          handler: () => {
            this.navCtrl.navigateRoot('/login');
          }
        }
      ]
    });

    await alert.present();
    popover.dismiss();
  }
  private async checkAuthState() {
    try {
      const user = await this.afAuth.currentUser;
      if (!user) {
        await this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      await this.showAlert('Error', 'Authentication failed');
    }
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
