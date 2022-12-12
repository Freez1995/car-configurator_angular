import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from 'firebase/firestore';

@Pipe({
  name: 'dateTransform',
})
export class DateTransformPipe implements PipeTransform {
  transform(timestamp: Timestamp): string {
    const date = timestamp.toDate();
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const ordinal = this.setDayOrdinal(day);
    return `${month} ${day}${ordinal} ${year}`;
  }

  setDayOrdinal(day: number) {
    let ordinal = '';
    if (day > 10 && day < 14) {
      return (ordinal = 'th');
    }
    switch (day % 10) {
      case 1:
        ordinal = 'st';
        break;
      case 2:
        ordinal = 'nd';
        break;
      case 3:
        ordinal = 'rd';
        break;
      default:
        ordinal = 'th';
    }
    return ordinal;
  }
}
