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
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private messageService: MessageService
  ) 
  {}

  ngOnInit() {
    this.prefetchMessages();
  }

  ngOnDestroy() {
    if (this.messagesPrefetchSubscription) {
      this.messagesPrefetchSubscription.unsubscribe();
    }
  }

  prefetchMessages() {
    this.messagesPrefetchSubscription = this.messageService.getMessages().subscribe();
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

}
