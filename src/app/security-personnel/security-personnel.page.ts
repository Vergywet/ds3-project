import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-security-personnel',
  templateUrl: './security-personnel.page.html',
  styleUrls: ['./security-personnel.page.scss'],
  standalone: false,
})
export class SecurityPersonnelPage implements OnInit {

  menuItems = [
    {
      title: 'Visitor Logs',
      description: 'Track and review visitor entries and exits',
      icon: 'people-outline',
      color: 'primary',
      route: '/security-personnel/visitors'
    },
    {
      title: 'Patrol Schedules',
      description: 'View assigned patrol schedules and locations',
      icon: 'walk-outline',
      color: 'secondary',
      route: '/security-personnel/patrols'
    },
    {
      title: 'Incident Alerts',
      description: 'Receive and respond to nearby incidents',
      icon: 'alert-circle-outline',
      color: 'danger',
      route: '/security-personnel/alerts'
    }
  ];

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {}

  navigateTo(item: any) {
    this.router.navigateByUrl(item.route);
  }

  async logout() {
    await this.afAuth.signOut();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
