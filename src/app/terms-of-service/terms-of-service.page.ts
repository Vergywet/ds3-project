import { Component } from '@angular/core';

@Component({
  selector: 'app-terms-of-service',
  templateUrl: './terms-of-service.page.html',
  styleUrls: ['./terms-of-service.page.scss'],
   standalone: false,
})
export class TermsOfServicePage {
  termsContent: string = `
    <h2>Terms of Service</h2>
    <p>Effective Date: May 22, 2025</p>

    <p>
      Welcome to Predictive Minds. These Terms of Service govern your use of our mobile application.
      By accessing or using the app, you agree to be bound by these terms.
    </p>

    <h3>1. Use of the App</h3>
    <p>
      You agree to use the app only for lawful purposes. You are responsible for any activity that occurs under your account.
    </p>

    <h3>2. User Accounts</h3>
    <p>
      You may be required to create an account. You are responsible for maintaining the confidentiality of your login credentials.
    </p>

    <h3>3. Intellectual Property</h3>
    <p>
      All content, features, and functionality of the app are the property of Predictive Minds and are protected by copyright and trademark laws.
    </p>

    <h3>4. Termination</h3>
    <p>
      We may suspend or terminate your access to the app if you violate these terms or engage in any activity that harms the app or its users.
    </p>

    <h3>5. Limitation of Liability</h3>
    <p>
      Predictive Minds is not liable for any indirect, incidental, or consequential damages arising from your use of the app.
    </p>

    <h3>6. Modifications</h3>
    <p>
      We reserve the right to update these Terms at any time. Continued use of the app means you accept the revised terms.
    </p>

    <h3>7. Contact Us</h3>
    <p>
      If you have any questions, contact us at <a href="mailto:support@predictiveminds.com">support@predictiveminds.com</a>.
    </p>
  `;
}
