import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.page.html',
  styleUrls: ['./privacy-policy.page.scss'],
  standalone: false,
})
export class PrivacyPolicyPage {
  policyContent: string = `
    <h2>Privacy Policy</h2>
    <p>Effective Date: May 22, 2025</p>

    <p>
      Predictive Minds values your privacy. This policy explains how we collect, use, and protect your personal information when you use our app.
    </p>

    <h3>1. Information We Collect</h3>
    <ul>
      <li>Personal details you provide (e.g. name, email)</li>
      <li>Usage data (e.g. page visits, actions taken)</li>
      <li>Device data (e.g. model, OS version)</li>
    </ul>

    <h3>2. How We Use Your Information</h3>
    <ul>
      <li>To provide and improve our services</li>
      <li>To send updates or notifications</li>
      <li>To comply with legal obligations</li>
    </ul>

    <h3>3. Sharing of Information</h3>
    <p>
      We do not sell or rent your personal data. Information may be shared with trusted partners who help us operate the app or as required by law.
    </p>

    <h3>4. Your Rights</h3>
    <p>
      You have the right to access, update, or delete your data. Contact us at <a href="mailto:support@predictiveminds.com">support@predictiveminds.com</a> for assistance.
    </p>

    <h3>5. Changes to This Policy</h3>
    <p>
      We may update this Privacy Policy from time to time. Updates will be posted on this page with the revised date.
    </p>

    <p>By using our app, you agree to this Privacy Policy.</p>
  `;
}
