import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceTransform',
})
export class PriceTransformPipe implements PipeTransform {
  transform(value: number): string {
    if (value === 0) {
      return `${value} €`;
    }

    return `
      ${value.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} €`;
  }
}
