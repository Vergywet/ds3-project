import { Component } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-vehicle-reg',
  templateUrl: './vehicle-reg.page.html',
  styleUrls: ['./vehicle-reg.page.scss'],
  standalone: false,
})
export class VehicleRegPage {
  vehicle = {
    name: '',
    registrationNumber: '',
    type: '',
    capacity: '',
    status: 'Active'
  };

  constructor(private firestore: Firestore) {}

  async registerVehicle() {
    if (this.vehicle.name && this.vehicle.registrationNumber) {
      const vehicleCollection = collection(this.firestore, 'vehicles');
      await addDoc(vehicleCollection, this.vehicle);
      alert('✅ Vehicle registered!');
      this.resetForm();
    } else {
      alert('⚠️ Please fill in required fields');
    }
  }

  resetForm() {
    this.vehicle = {
      name: '',
      registrationNumber: '',
      type: '',
      capacity: '',
      status: 'Active'
    };
  }
}
