import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Car } from '../../shared/models/Car';

@Injectable({
  providedIn: 'root',
})
export class CarCollectionService {
  carCollection = this.firestore.collection<Car>('cars');

  constructor(private firestore: AngularFirestore) {}
}
