import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges } from "@angular/core";

@Component({
  selector: 'rtds-container',
  templateUrl: 'container.component.html',
  styleUrls: ['./container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerComponent implements OnChanges {
  @HostBinding('class') @Input() public type: Type = 'standard';
  @HostBinding('class') protected get setClass(): string {
    return `rtds-container rtds-container--${this.type}`;
  }

  ngOnChanges() {
    // eslint-disable-next-line no-console
    console.log(this.type);
  }
}

type Type = 'full' | 'standard' | 'narrow';
