import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  CarCollection,
  Color,
  Exterior,
  Interior,
  SavedCarConfiguration,
  Wheels,
} from '../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class CarActionsService {
  constructor(private readonly firestore: AngularFirestore) {}

  getCarCollection() {
    return this.firestore.collection<CarCollection>('cars');
  }

  getColorsByCarId(carId: string) {
    return this.firestore
      .collection<Color>('colors', (ref) => ref.where('carId', '==', carId))
      .valueChanges({ idField: 'colorId' });
  }

  getWheelsByCarId(carId: string) {
    return this.firestore
      .collection<Wheels>('wheels', (ref) => ref.where('carId', '==', carId))
      .valueChanges({ idField: 'wheelsId' });
  }

  getInteriorByCarId(carId: string) {
    return this.firestore
      .collection<Interior>('interiors', (ref) =>
        ref.where('carId', '==', carId)
      )
      .valueChanges({ idField: 'interiorId' });
  }

  getImagesByCarId(carId: string) {
    return this.firestore
      .collection<Exterior>('exteriorImages', (ref) =>
        ref.where('carId', '==', carId)
      )
      .valueChanges({ idField: 'exteriorId' });
  }

  saveCarConfiguration(selectedConfiguration: SavedCarConfiguration) {
    return this.firestore
      .collection<SavedCarConfiguration>('savedConfigurations')
      .add(selectedConfiguration);
  }

  updateCarConfiguration(
    documentId: string,
    selectedConfiguration: SavedCarConfiguration
  ) {
    return this.firestore
      .collection<SavedCarConfiguration>('savedConfigurations')
      .doc(documentId)
      .update(selectedConfiguration);
  }
}
