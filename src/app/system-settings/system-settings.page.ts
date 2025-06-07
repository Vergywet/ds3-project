import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-system-settings',
  templateUrl: './system-settings.page.html',
  styleUrls: ['./system-settings.page.scss'],
  standalone: false,
})
export class SystemSettingsPage implements OnInit {
  language: string = 'en';
  themeMode: 'light' | 'dark' = 'light';

  constructor(private location: Location) { // Fixed spelling of 'constructor'
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
