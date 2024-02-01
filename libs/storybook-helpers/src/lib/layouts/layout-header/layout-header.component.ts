import { Component } from '@angular/core';

@Component({
  selector: 'rtds-layout-header',
  template: `
    <span class="rtds-layout-header__text">
      <span class="rtds-layout-header__label">Component</span>
      <ng-content></ng-content>
    </span>
  `,
  styleUrls: ['./layout-header.component.scss'],
})
export class LayoutHeaderComponent {}
