import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: false,
})
export class AboutPage {
  aboutContent: string = `
    <h2>About Predictive Minds</h2>
    <p>
      Predictive Minds is an innovative platform designed to support students and institutions with smarter, more connected learning environments.
    </p>

    <h3>Our Mission</h3>
    <p>
      To empower students and educators through intuitive tools that improve productivity, engagement, and academic outcomes.
    </p>

    <h3>What We Offer</h3>
    <ul>
      <li>Real-time dashboard features</li>
      <li>Smart scheduling and reminders</li>
      <li>Data-driven insights for academic progress</li>
      <li>System settings for personalized experiences</li>
    </ul>

    <h3>Contact Us</h3>
    <p>
      We'd love to hear from you! Reach out to us at
      <a href="mailto:support@predictiveminds.com">support@predictiveminds.com</a>.
    </p>

    <p><strong>Version:</strong> 1.0.0</p>
  `;
}
