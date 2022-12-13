import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-drawer-item',
  templateUrl: './drawer-item.component.html',
  styleUrls: ['./drawer-item.component.scss'],
})
export class DrawerItemComponent {
  @Input() itemImage?: string;
  @Input() itemName?: string;
  @Input() itemType?: string;
  @Input() itemPrice?: number;
  @Input() isSelected?: boolean;
}
