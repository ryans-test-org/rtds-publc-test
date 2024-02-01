import { Component, Input } from '@angular/core';

@Component({
  selector: 'rtds-layout-do-dont',
  template: `
    <div class="rtds-do-dont__wrapper">
      <div class="rtds-do-dont__block rtds-do-dont__block--do">
        <span class="rtds-do-dont__label">Do</span>
        <ul class="rtds-do-dont__list">
<!--          @for (do of dos; track do) {-->
<!--            <li class="rtds-do-dont__list-item">-->
<!--              {{ do }}-->
<!--            </li>-->
<!--          }-->
        </ul>
      </div>
      <div class="rtds-do-dont__block rtds-do-dont__block--dont">
        <span class="rtds-do-dont__label">Don't</span>
        <ul class="rtds-do-dont__list">
<!--          @for (dont of donts; track dont) {-->
<!--            <li class="rtds-do-dont__list-item">-->
<!--            {{ dont }}-->
<!--            </li>-->
<!--          }-->
        </ul>
      </div>
    </div>
  `,
  styleUrls: ['./layout-do-dont.component.scss'],
})
export class LayoutDoDontComponent {
  @Input() public dos: Array<string> = [];
  @Input() public donts: Array<string> = [];
}
