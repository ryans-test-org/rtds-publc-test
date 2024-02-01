import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: 'rtds-panel-header',
  templateUrl: 'panel-header.component.html',
  styleUrls: ['panel-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PanelHeaderComponent {
  @Input({ required: true }) public title: string;
}
