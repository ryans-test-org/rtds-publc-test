import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: 'rtds-panel-content',
  templateUrl: 'panel-content.component.html',
  styleUrls: ['panel-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PanelContentComponent {
  @Input() public subtitle: string;
}
