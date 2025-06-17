import { Component } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-driver-reg',
  templateUrl: './driver-reg.page.html',
  styleUrls: ['./driver-reg.page.scss'],
  standalone: false,
})
export class DriverRegPage {
  driver = {
    name: '',
    idNumber: '',
    phone: '',
    email: '',
    license: '',
    status: 'Active'
  };

  constructor(private firestore: Firestore) {}

  async registerDriver() {
    if (this.driver.name.trim() && this.driver.idNumber.trim()) {
      try {
        const driverRef = collection(this.firestore, 'drivers');
        await addDoc(driverRef, this.driver);
        alert('✅ Driver registered successfully!');
        this.resetForm();
      } catch (error) {
        console.error('❌ Error adding driver:', error);
        alert('Something went wrong while saving. Please try again.');
      }
    } else {
      alert('⚠️ Full Name and ID Number are required');
    }
  }

  resetForm() {
    this.driver = {
      name: '',
      idNumber: '',
      phone: '',
      email: '',
      license: '',
      status: 'Active'
    };
  }
}
