import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-law-dashboard',
  templateUrl: './law-dashboard.page.html',
  styleUrls: ['./law-dashboard.page.scss'],
  standalone: false,
})
export class LawDashboardPage implements OnInit {

  menuItems = [
    {
      title: 'Incident Reports',
      description: 'View and manage public incident reports',
      icon: 'document-text-outline',
      color: 'tertiary',
      route: '/law-dashboard/incidents'
    },
    {
      title: 'Suspect Records',
      description: 'Access database of suspects and persons of interest',
      icon: 'person-circle-outline',
      color: 'danger',
      route: '/law-dashboard/suspects'
    },
    {
      title: 'Evidence Upload',
      description: 'Submit or view uploaded evidence',
      icon: 'cloud-upload-outline',
      color: 'success',
      route: '/law-dashboard/evidence'
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
