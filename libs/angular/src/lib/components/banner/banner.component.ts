import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { IconName } from "../icon/model/icon.model";
import { iconCriticalFilled, iconLock, iconWarning } from "@rtds/icons";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'rtds-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['banner.component.scss'],
})
export class BannerComponent implements OnInit {
  private ariaLiveLookup = new Map()
    .set(Banners.critical, 'assertive')
    .set(Banners.warning, 'polite')
    .set(Banners.technical, 'polite')
    .set(Banners.success, 'polite')
    .set(Banners.informational, 'off')
    .set(Banners.bestPractice, 'off')
    .set(Banners.permission, 'off')
    .set(Banners.default, 'off');

  @HostBinding('class') get setClassNames() {
    return 'c-banner js-banner' + this.title ?
           'js-banner js-banner-' + this.title?.replace(/[^a-z]|\s+|\r?\n|\r/gmi, ' ')
                                        .replace(/\s+/g, '-').replace(/-$/, '').toLowerCase()
                                             : '';
  };

  @HostBinding('attr.aria-label') get ariaLabel() {
    const rest = `${this.variant} banner`.substring(1);
    return this.variant ? `${this.variant.charAt(0).toUpperCase()}${rest}` : 'Banner';
  };

  @HostBinding('attr.role') protected ariaRole = 'status';
  @HostBinding('attr.aria-atomic') protected ariaAtomic = 'true';

  @HostBinding('attr.aria-live') get ariaLive() {
    return this.ariaLiveLookup.get(this.variant);
  }

  @HostBinding('class.is-clickable') @Input() public isClickable = false;

  @Input({ required: true }) public variant: Banner;
  @Input() public title: string;
  @Input() public isGlobal? = false;
  @Input() public isLocal? = false;
  @Input() public isHeaderNotification? = false;
  @Input() public isDismissable? = false;
  @Input() public scrollIntoView? = false;
  @Output() protected bannerClick = new EventEmitter<boolean>();

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
    if (this.scrollIntoView) {
      const yOffset = -70; // to get away from the header
      const y = this.element.nativeElement.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, left: 0, behavior: 'smooth' });
    }
  }

  onClick(): void {
    this.bannerClick.emit(true);
  }

  get getIconName(): IconName {
    switch (this.variant) {
      case Banners.technical:
      case Banners.critical:
        return iconCriticalFilled.name
      case Banners.default:
      case Banners.informational:
        return iconWarning.name
      case Banners.permission:
        return iconLock.name
      default:
        return this.variant.toLowerCase() as IconName
    }
  }

}

export enum Banners {
  success = 'success',
  warning = 'warning',
  critical = 'critical',
  informational = 'informational',
  technical = 'technical',
  bestPractice = 'bestPractice',
  permission = 'permission',
  default = 'default'
}

type Banner = keyof typeof Banners;
