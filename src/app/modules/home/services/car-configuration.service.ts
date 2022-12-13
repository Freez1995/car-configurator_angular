import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SavedCarConfiguration } from '../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class CarConfigurationService {
  constructor(private readonly firestore: AngularFirestore) {}

  getCarConfigurations(userId: string) {
    return this.firestore.collection<SavedCarConfiguration>(
      'savedConfigurations',
      (ref) => ref.where('userId', '==', userId).orderBy('createdAt', 'desc')
    );
  }

  deleteDocumentById(documentId: string) {
    return this.firestore
      .collection('savedConfigurations')
      .doc(documentId)
      .delete();
  }
}
