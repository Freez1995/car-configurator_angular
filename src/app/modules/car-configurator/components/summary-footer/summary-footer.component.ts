import { Component, OnInit } from '@angular/core';
import { CarStoreService } from '../../services/car-store.service';

@Component({
  selector: 'app-summary-footer',
  templateUrl: './summary-footer.component.html',
  styleUrls: ['./summary-footer.component.scss'],
})
export class SummaryFooterComponent {
  selectedConfiguration$ = this.carStoreService.selectedConfiguration$;

  constructor(private readonly carStoreService: CarStoreService) {}
}
