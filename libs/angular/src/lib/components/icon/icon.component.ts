import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, Input, Renderer2, ViewChild, } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { iconContexts, iconSizeMap } from './icon.component.data';
import { IconsRegistryService } from './icons.service';
import { IconItemModel, IconSize, IconVariants, } from './model/icon-component.model';
import { IconName } from './model/icon.model';

@Component({
  selector: 'rtds-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent implements AfterViewInit {
  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);
  private sanitizer = inject(DomSanitizer);
  private iconSet = inject(IconsRegistryService);
  protected scale = '0 0 24 24';
  protected iconData: IconItemModel;
  @Input() public size: IconSize;
  @Input({ required: true }) public type: IconName;
  @Input() public variant?: IconVariants;

  /**
   * @ignore
   */
  @ViewChild('svgElement', { read: ElementRef }) protected svgElementRef!: ElementRef;

  ngAfterViewInit(): void {
    if (this.svgElementRef) {
      const parentElement = this.renderer.parentNode(
        this.elementRef?.nativeElement
      );
      const svgElement = this.svgElementRef.nativeElement;
      this.renderer.insertBefore(
        parentElement,
        svgElement,
        this.elementRef?.nativeElement
      );
      this.renderer.removeChild(parentElement, this.elementRef?.nativeElement);
    }
  }

  get innerHtml(): SafeHtml {
    let code = '';
    Array.from(this.code as NodeList).forEach((ele, index) => {
      code += this.code[index].outerHTML;
    });
    return this.sanitizer.bypassSecurityTrustHtml(this.titleCode + code ?? '');
  }

  get titleCode(): string {
    return `<title>${
      iconContexts.get(
        this.iconData.supportedVariants.includes(this.variant!)
        ? this.variant!
        : this.iconData.supportedVariants[0]!
      )!.title
    }</title>`;
  }

  get code(): any {
    if (!this.type) {
      console.warn('rtds--icon component: icon name is required');
      return undefined;
    } else {
      this.iconData = this.iconSet.getIcon(this.type)!;
      if (!this.iconData) {
        console.warn(
          `rtds--icon component: icon name '${this.type}' does not exist for IconSet service. ` +
          `To use icon by 'name' prop you need to add it to IconSet service. \n`,
          this.type
        );
        return undefined;
      } else if (this.variant && !this.iconData.supportedVariants.includes(this.variant)) {
        console.warn(
          `rtds--icon component: icon name '${
            this.type
          }' supports only following contexts : ${this.iconData.supportedVariants.join(
            ', '
          )} \n` + this.type
        );
      }
      return this.iconData.data;
    }
  }

  get iconClass(): string {
    return `rtds-icon js-icon-${this.type} ` + iconContexts.get(
      this.variant &&
      this.iconData.supportedVariants.includes(this.variant)
      ? this.variant
      : this.iconData.supportedVariants[0]
    )!.class;
  }

  get iconSize(): string {
    return this.size ? iconSizeMap.get(this.size) : iconSizeMap.get('default');
  }
}
