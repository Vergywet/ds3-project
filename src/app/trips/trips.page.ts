import { Component } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss'],
  standalone: false,
})
export class TripsPage {

  trip = {
    driverId: '',
    vehicle: '',
    origin: '',
    destination: '',
    datetime: ''
  };

  checkpoints: string[] = [];

  constructor(private firestore: Firestore) {}

  addCheckpoint() {
    this.checkpoints.push('');
  }

  removeCheckpoint(index: number) {
    this.checkpoints.splice(index, 1);
  }

  async submitTrip() {
    const tripData = {
      ...this.trip,
      status: 'Pending',
      checkpoints: this.checkpoints.map(cp => ({
        name: cp,
        isVisited: false
      }))
    };

    try {
      const tripsRef = collection(this.firestore, 'Trips');
      await addDoc(tripsRef, tripData);
      alert('Trip successfully saved!');
      this.resetForm();
    } catch (err) {
      console.error('Trip saving failed:', err);
      alert('Error saving trip. Try again.');
    }
  }

  resetForm() {
    this.trip = {
      driverId: '',
      vehicle: '',
      origin: '',
      destination: '',
      datetime: ''
    };
    this.checkpoints = [];
  }
}
