import { Component } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-generate-reports',
  templateUrl: './generate-reports.page.html',
  styleUrls: ['./generate-reports.page.scss'],
  standalone:false,
})
export class GenerateReportsPage {
  filters = {
    startDate: '',
    endDate: '',
    incidentType: 'All Types',
    location: 'All Locations',
    format: 'PDF',
  };

  incidentTypes = ['All Types', 'Trespassing', 'Vandalism', 'Fire'];
  locations = ['All Locations', 'Clinic', 'Warehouse'];
  formats = ['PDF'];

  reportData = [
    { date: 'Apr 28, 2025', title: 'Clinic Trespassing' },
    { date: 'Apr 20, 2025', title: 'Vandalism Summary' },
  ];

  constructor(private alertCtrl: AlertController, private platform: Platform) {}

  private validateFilters(): boolean {
    if (!this.filters.startDate || !this.filters.endDate) {
      this.showAlert('Validation Error', 'Please enter both start and end dates.');
      return false;
    }
    // Additional validation can be added here (e.g., date format, logical checks)
    return true;
  }

  private generatePDFContent(): string {
    const { startDate, endDate, incidentType, location, format } = this.filters;

    const rows = this.reportData
      .map(
        (report) =>
          `<tr><td>${report.date}</td><td>${report.title}</td></tr>`
      )
      .join('');

    return `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #2563eb; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #2563eb; color: white; }
            footer { margin-top: 40px; font-size: 12px; color: #888; text-align: center; }
          </style>
        </head>
        <body>
          <h1>Security Report</h1>
          <p><strong>Report Filters:</strong></p>
          <ul>
            <li>Start Date: ${startDate}</li>
            <li>End Date: ${endDate}</li>
            <li>Incident Type: ${incidentType}</li>
            <li>Location: ${location}</li>
            <li>Format: ${format}</li>
          </ul>
          <p><strong>Report Data:</strong></p>
          <table>
            <tr>
              <th>Date</th>
              <th>Title</th>
            </tr>
            ${rows}
          </table>
          <footer>Predictive Minds © 2025</footer>
        </body>
      </html>
    `;
  }

  async onGenerateReport() {
    if (!this.validateFilters()) return;

    if (this.filters.format === 'PDF') {
      const htmlContent = this.generatePDFContent();

      if (this.platform.is('hybrid')) {
        // Native print on device using printer plugin (optional)
        try {
          // invoke native print (you need to install plugin and add provider)
          // await this.printer.print(htmlContent);
          // For now, just alert success
          this.showAlert('Success', 'Print functionality available on native devices.');
        } catch (error) {
          this.showAlert('Error', 'Failed to generate or share the PDF report.');
        }
      } else {
        // Web fallback: open new window with HTML content and let user print manually
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(htmlContent);
          printWindow.document.close();
          printWindow.focus();
          printWindow.print();
        } else {
          this.showAlert('Error', 'Unable to open print window.');
        }
      }
    } else {
      this.showAlert('Format Not Supported', 'Only PDF format is supported currently.');
    }
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
