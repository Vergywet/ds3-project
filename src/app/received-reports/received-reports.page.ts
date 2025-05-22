import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-received-reports',
  templateUrl: './received-reports.page.html',
  styleUrls: ['./received-reports.page.scss'],
  standalone:false,
})
export class ReceivedReportsPage {
  searchText: string = '';

  reports = [
    { id: '1', title: 'Unauthorized Access', date: '2025-06-01 10:30', status: 'Open' },
    { id: '2', title: 'Suspicious Activity', date: '2025-06-02 14:15', status: 'Closed' },
    { id: '3', title: 'System Alert', date: '2025-06-03 09:45', status: 'In Progress' },
    { id: '4', title: 'Network Breach', date: '2025-06-04 16:20', status: 'Open' },
    { id: '5', title: 'Malware Detected', date: '2025-06-05 11:00', status: 'Open' },
    { id: '6', title: 'Phishing Attempt', date: '2025-06-06 13:30', status: 'Closed' },
    { id: '7', title: 'Data Leak', date: '2025-06-07 15:45', status: 'In Progress' },
    { id: '8', title: 'Unauthorized Login', date: '2025-06-08 09:20', status: 'Open' },
    { id: '9', title: 'System Failure', date: '2025-06-09 17:10', status: 'Closed' },
  ];

  constructor(private navCtrl: NavController) {}

  get filteredReports() {
    const query = this.searchText.toLowerCase();
    return this.reports.filter(report =>
      report.title.toLowerCase().includes(query)
    );
  }

  goBack() {
    this.navCtrl.navigateBack('/law-dashboard');
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'open': return 'primary';
      case 'closed': return 'medium';
      case 'in progress': return 'warning';
      default: return 'dark';
    }
  }
}
