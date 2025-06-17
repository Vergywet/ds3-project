import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs, addDoc, query, where } from '@angular/fire/firestore';

@Component({
  selector: 'app-assign-trip',
  templateUrl: './assign-trip.page.html',
  styleUrls: ['./assign-trip.page.scss'],
  standalone: false,
})
export class AssignTripPage implements OnInit {

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

  // Load drivers from 'users' collection where role == 'driver'
  async loadDrivers() {
    try {
      const driversQuery = query(
        collection(this.firestore, 'users'),
        where('role', '==', 'driver')
      );
      const snapshot = await getDocs(driversQuery);
      this.drivers = snapshot.docs.map(doc => doc.data()['name']);
    } catch (error) {
      console.error('Error loading drivers:', error);
    }
  }

  // Load vehicles from 'vehicles' collection
  async loadVehicles() {
    try {
      const snapshot = await getDocs(collection(this.firestore, 'vehicles'));
      this.vehicles = snapshot.docs.map(doc => doc.data()['name']);
    } catch (error) {
      console.error('Error loading vehicles:', error);
    }
  }

  // Save the trip document to Firestore
  async saveTrip() {
    try {
      const tripCollection = collection(this.firestore, 'trips');
      await addDoc(tripCollection, this.trip);
      alert('✅ Trip assigned and saved successfully!');
      this.resetTripForm();
    } catch (error) {
      alert('❌ Failed to save trip.');
      console.error('Error saving trip:', error);
    }
  }

  resetTripForm() {
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
