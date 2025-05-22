import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor() {
    //load saved theme on page load
    const saveTheme = localStorage.getItem('themeMode') as 'light' | 'dark';
    if (saveTheme) {
      document.body.classList.toggle('dark', saveTheme === 'dark');
    }

  }
}
