import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NavController, AlertController, IonPopover } from '@ionic/angular';
import { MessageService } from '../shared/message.service';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-law-dashboard',
  templateUrl: './law-dashboard.page.html',
  styleUrls: ['./law-dashboard.page.scss'],
  standalone:false,
})
export class LawDashboardPage implements OnInit, OnDestroy {

  @ViewChild(IonPopover) popover: IonPopover | undefined;

  menuItems = [
    {
      icon: 'document-text-outline',
      title: 'Received Reports',
      description: 'Monitor and control drone operations',
      color: 'primary',
      route: '/received-reports'
    },
    {
      icon: 'shield-outline',
      title: 'Threats Detected',
      description: 'Monitor detected suspicious activities',
      color: 'primary',
      route: '/threats-detected'
    },
    {
      icon: 'chatbox-ellipses-outline',
      title: 'Communicate with Security',
      description: 'Send updates or urgent requests',
      color: 'primary',
      route: '/law-comms'
    },
    {
      icon: 'bar-chart-outline',
      title: 'Generate Reports',
      description: 'Create detailed incident reports',
      color: 'primary',
      route: '/generate-reports'
    },
    {
      icon: 'settings-outline',
      title: 'System Settings',
      description: 'Change language, theme, or preferences',
      color: 'primary',
      route: '/system-settings'
    }
  ];

  private messagesPrefetchSubscription?: Subscription;

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private messageService: MessageService,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

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

  async logout() {
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
          handler: async () => {
            if (this.popover) {
              await this.popover.dismiss();
            }
            await this.afAuth.signOut();
            this.navCtrl.navigateRoot('/login');
          }
        }
      ]
    });

    await alert.present();
  }

  navigateTo(item: any) {
    this.navCtrl.navigateForward(item.route);
  }
}
