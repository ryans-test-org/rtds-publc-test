import { ChangeDetectionStrategy, Component, HostBinding, Input } from "@angular/core";

@Component({
  selector: "rtds-panel",
  templateUrl: "panel.component.html",
  styleUrls: ['panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelComponent {
  @HostBinding("class") @Input() public variant: Variant = "standard";
  @HostBinding('class') private classes = 'rtds-panel__container';
}

export enum PanelVariants {
  standard = "standard",
  success = "success",
  attention = "attention",
  critical = "critical",
  informational = "informational"
}

type Variant = keyof typeof PanelVariants;
