import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-system-settings',
  templateUrl: './system-settings.page.html',
  styleUrls: ['./system-settings.page.scss'],
  standalone: false,
})
export class SystemSettingsPage implements OnInit {
  language: string = 'en';
  themeMode: 'light' | 'dark' = 'light';

  constructor(
    private location: Location,
    private navCtrl: NavController // Add this if not already injected
  ) {
    this.loadSavedTheme();
  }

  ngOnInit() {
    // Initialize any additional settings here
  }

  private loadSavedTheme() {
    const savedTheme = localStorage.getItem('themeMode') as 'light' | 'dark';
    if (savedTheme) {
      this.themeMode = savedTheme;
      this.applyTheme(savedTheme);
    }
  }

  private applyTheme(theme: 'light' | 'dark') {
    document.body.classList.toggle('dark', theme === 'dark');
  }

  goBack() {
    this.location.back();
  }

  goToDashboard() {
  const role = localStorage.getItem('userRole')?.toLowerCase();

if (role === 'admin') {
  this.navCtrl.navigateRoot('/admin-dashboard');
} else if (role === 'security personnel') {
  this.navCtrl.navigateRoot('/security-personnel');
} else if (role === 'law enforcement officer') {
  this.navCtrl.navigateRoot('/law-dashboard');
} else if (role === 'driver') {
  this.navCtrl.navigateRoot('/driverdashboard');
}

}


  changeLanguage(language: string) {
    this.language = language;
    localStorage.setItem('language', language);
    // Add your language change implementation here
  }

  toggleTheme() {
    this.themeMode = this.themeMode === 'light' ? 'dark' : 'light';
    this.applyTheme(this.themeMode);
    localStorage.setItem('themeMode', this.themeMode);
  }
}
