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

  toggleTheme() {
    this.themeMode = this.themeMode === 'light' ? 'dark' : 'light';
    document.body.classList.toggle('dark', this.themeMode === 'dark');
  }
}
