import { Component } from '@angular/core';

@Component({
  selector: 'app-system-settings',
  templateUrl: './system-settings.page.html',
  styleUrls: ['./system-settings.page.scss'],
  standalone: false,
})
export class SystemSettingsPage {
  language: string = 'en';  // ✅ Fixes the 'language' error
  themeMode: 'light' | 'dark' = 'light';  // ✅ Fixes the 'themeMode' error

  constructer() {
    //load saved theme on page load
    const saveTheme = localStorage.getItem('themeMode')as 'light' | 'dark';
    if (saveTheme) {
      this.themeMode = saveTheme;
      document.body.classList.toggle('dark', this.themeMode === 'dark');
    }
  }
  // Method to change the language
  changeLanguage(language: string) {
    this.language = language;
    // Logic to change the app's language can be added here
  }
  toggleTheme() {
    this.themeMode = this.themeMode === 'light' ? 'dark' : 'light';
    document.body.classList.toggle('dark', this.themeMode === 'dark');
    localStorage.setItem('themeMode', this.themeMode);

  }
}
