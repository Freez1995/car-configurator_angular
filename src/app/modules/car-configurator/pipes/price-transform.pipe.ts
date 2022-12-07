import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceTransform',
})
export class PriceTransformPipe implements PipeTransform {
  transform(value: number, nofractionDigits?: boolean): string {
    if (value === 0) {
      return `${value} €`;
    }

    if (nofractionDigits) {
      return `${value.toLocaleString('en-US')} €`;
    }

    return `
      ${value.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} €`;
  }
}
