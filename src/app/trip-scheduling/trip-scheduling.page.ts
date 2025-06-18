import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
 


@Component({
  selector: 'app-trip-scheduling',
  templateUrl: './trip-scheduling.page.html',
  styleUrls: ['./trip-scheduling.page.scss'],
  standalone: false,
})
export class TripSchedulingPage implements OnInit {
  selectedFilter: string = 'all'; // or your default value

  drivers: string[] = [];
  vehicles: string[] = [];

  trip = {
    driver: '',
    vehicle: '',
    deliveryTime: '',
    returnTime: '',
    checkpoints: [
      { name: '', timeToReach: '' },
      { name: '', timeToReach: '' },
      { name: '', timeToReach: '' },
      { name: '', timeToReach: '' }
    ]
  };

  tripData: Trip[] = [
    {
      id: '1',
      vehicle: 'Car',
      'vehicle-reg': 'ABC123',
      datetime: '2025-06-13 10:00',
      destination: 'City Center',
      status: 'Completed'
    }
    // ...other trips
  ];

  constructor(private firestore: AngularFirestore) {}

async ngOnInit() {
  await this.loadDrivers();
  await this.loadVehicles();
}

async loadDrivers() {
  const snapshot = await this.firestore.collection('drivers').get().toPromise();
  this.drivers = snapshot?.docs.map(doc => (doc.data() as any)['name']) || [];
}

async loadVehicles() {
  const snapshot = await this.firestore.collection('vehicles').get().toPromise();
  this.vehicles = snapshot?.docs.map(doc => (doc.data() as any)['name']) || [];
}

async saveTrip() {
  await this.firestore.collection('trips').add(this.trip);
  alert('✅ Trip saved to Firebase!');
  this.resetForm();
}

  resetForm() {
    this.trip = {
      driver: '',
      vehicle: '',
      deliveryTime: '',
      returnTime: '',
      checkpoints: [
        { name: '', timeToReach: '' },
        { name: '', timeToReach: '' },
        { name: '', timeToReach: '' },
        { name: '', timeToReach: '' }
      ]
    };
  }
}

interface Trip {
  id: string;
  vehicle: string;
  'vehicle-reg': string;
  datetime: string;
  destination: string;
  status: string;
}
