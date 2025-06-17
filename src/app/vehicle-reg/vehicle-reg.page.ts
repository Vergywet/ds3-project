import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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

  constructor(private firestore: AngularFirestore) {}

  registerVehicle() {
    const { name, registrationNumber, type, capacity, status } = this.vehicle;

    // Trim all inputs
    const trimmedName = name?.trim();
    const trimmedRegNum = registrationNumber?.trim();
    const trimmedType = type?.trim();
    const trimmedCapacity = capacity?.toString().trim();
    const trimmedStatus = status?.trim();

    // Validate all fields
    if (!trimmedName || !trimmedRegNum || !trimmedType || !trimmedCapacity || !trimmedStatus) {
      alert('⚠️ All fields are required. Please fill them in.');
      return;
    }

    // Check capacity is numeric
    if (isNaN(Number(trimmedCapacity))) {
      alert('⚠️ Capacity must be a number.');
      return;
    }

    // Add to Firestore
    const docRef = this.firestore.collection('vehicles').doc(trimmedRegNum);

    docRef.set({
      name: trimmedName,
      registrationNumber: trimmedRegNum,
      type: trimmedType,
      capacity: Number(trimmedCapacity),
      status: trimmedStatus,
      createdAt: new Date()
    })
    .then(() => {
      alert('✅ Vehicle successfully registered!');
      this.resetForm();
    })
    .catch((error) => {
      console.error('Firestore Error:', error);
      alert('❌ Error adding vehicle: ' + error.message);
    });
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
