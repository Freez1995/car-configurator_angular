import { Component, OnInit } from '@angular/core';
import { Subscription, take, tap } from 'rxjs';
import { CarStoreService } from '../../services/car-store.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss'],
})
export class DetailsPageComponent implements OnInit {
  selectedConfiguration$ = this.carStoreService.selectedConfiguration$;
  isLoading$ = this.carStoreService.isLoading$;

  constructor(private carStoreService: CarStoreService) {}

  ngOnInit(): void {}
}
