import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-trip-scheduling',
  templateUrl: './trip-scheduling.page.html',
  styleUrls: ['./trip-scheduling.page.scss'],
  standalone: false,
})
export class TripSchedulingPage implements OnInit {

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

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    this.loadDrivers();
    this.loadVehicles();
  }

  async loadDrivers() {
    const driverSnapshot = await getDocs(collection(this.firestore, 'drivers'));
    this.drivers = driverSnapshot.docs.map(doc => doc.data()['name']);
  }

  async loadVehicles() {
    const vehicleSnapshot = await getDocs(collection(this.firestore, 'vehicles'));
    this.vehicles = vehicleSnapshot.docs.map(doc => doc.data()['name']);
  }

  async saveTrip() {
    const tripCollection = collection(this.firestore, 'trips');
    await addDoc(tripCollection, this.trip);
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
