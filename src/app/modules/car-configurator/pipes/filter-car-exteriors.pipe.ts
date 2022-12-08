import { Pipe, PipeTransform } from '@angular/core';
import { Exterior } from '../../shared/models';

@Pipe({
  name: 'filterCarExteriors',
})
export class FilterCarExteriorsPipe implements PipeTransform {
  transform(
    exteriors: Exterior[],
    configurationColorId: string,
    configurationWheelsId: string
  ): string[] {
    const exteriror = exteriors.find(
      (exterior) =>
        exterior.colorId === configurationColorId &&
        exterior.wheelsId === configurationWheelsId
    );

    if (!exteriror) {
      return [];
    }

    return exteriror.imgUrl;
  }
}
