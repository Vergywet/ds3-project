import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Trip {
  id: string;
  vehicle: string;
  datetime: string;
  destination: string;
  status: string;
}

@Component({
  selector: 'app-assigned-trip',
  templateUrl: './assigned-trip.page.html',
  styleUrls: ['./assigned-trip.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class AssignedTripPage {
  selectedFilter = 'all';

  tripData: Trip[] = [
    // Example data, replace with your actual data or leave as an empty array
    // { id: '1', vehicle: 'Car', datetime: '2025-06-13 10:00', destination: 'City Center', status: 'Completed' }
  ];
}
