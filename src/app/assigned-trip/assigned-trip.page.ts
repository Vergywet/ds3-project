import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assigned-trip',
  templateUrl: './assigned-trip.page.html',
  styleUrls: ['./assigned-trip.page.scss'],
  standalone: false,
})
export class AssignedTripPage implements OnInit {
  trips: any[] = []; // Example: array of assigned trips

  constructor() {}

  ngOnInit() {
    // You can load assigned trips here later
    this.trips = [
      { id: 1, destination: 'Downtown', time: '10:00 AM' },
      { id: 2, destination: 'Airport', time: '1:00 PM' },
    ];
  }
}
