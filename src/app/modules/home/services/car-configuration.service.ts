import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../../auth/services/auth-service.service';
import { SavedCarConfiguration } from '../../shared/models/SavedConfiguration';

@Injectable({
  providedIn: 'root',
})
export class CarConfigurationService {
  constructor(private auth: AuthService, private firestore: AngularFirestore) {}

  getCarConfigurations() {
    return this.firestore.collection<SavedCarConfiguration>(
      'savedConfigurations',
      (ref) =>
        ref.where('userId', '==', this.auth.userId).orderBy('createdAt', 'desc')
    );
  }
}
