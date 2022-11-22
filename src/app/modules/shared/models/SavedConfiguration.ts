import { Timestamp } from 'firebase/firestore';
import { Car } from './Car';
import { Color } from './Color';
import { Interior } from './Interior';
import { Wheels } from './Wheels';

export interface SavedCarConfiguration {
  documentId?: string;
  userId: string;
  car: Car;
  color: Color;
  wheels: Wheels;
  interior: Interior;
  carSideImage: string;
  createdAt: Timestamp;
}
