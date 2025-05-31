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

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {}

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
  goToProfile() {
  this.router.navigateByUrl('/profile');
}


  async logout() {
    await this.afAuth.signOut();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
