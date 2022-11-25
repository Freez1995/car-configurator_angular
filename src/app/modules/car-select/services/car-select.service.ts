import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  CarCollection,
  Color,
  Exterior,
  Interior,
  Wheels,
} from '../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class CarSelectService {
  constructor(private firestore: AngularFirestore) {}

  getCarCollection() {
    return this.firestore.collection<CarCollection>('cars');
  }

  getColorsByCarId(carId: string) {
    return this.firestore.collection<Color>('colors', (ref) =>
      ref.where('carId', '==', carId)
    );
  }

  getWheelsByCarId(carId: string) {
    return this.firestore.collection<Wheels>('wheels', (ref) =>
      ref.where('carId', '==', carId)
    );
  }

  getInteriorByCarId(carId: string) {
    return this.firestore.collection<Interior>('interiors', (ref) =>
      ref.where('carId', '==', carId)
    );
  }

  getImagesByCarId(carId: string) {
    return this.firestore.collection<Exterior>('exteriorImages', (ref) =>
      ref.where('carId', '==', carId)
    );
  }
}
