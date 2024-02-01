import { Injectable } from '@angular/core';
import { completeIconSet } from '@rtds/icons';
import { supportedVariants } from './icon.component.data';
import { IconItemModel } from './model/icon-component.model';
import { IconModel, IconName } from './model/icon.model';

@Injectable({
  providedIn: 'root',
})

export class IconsRegistryService {
  private icons: Map<IconName, IconItemModel> = new Map<
    IconName,
    IconItemModel
  >();

  getIconHtml(icon: IconModel): any {
    if (icon?.data) {
      const parser = new DOMParser();

      // convert html string into DOM element
      const document = parser.parseFromString(icon.data, 'image/svg+xml');
      const elem = document?.firstChild?.childNodes || '';
      return elem;
    } else {
      return '';
    }
  }

  /**
   * Register icon for later use
   *
   * @param icons Icon Name to register
   */
  setIcon(iconName: IconName): void {
    if (this.icons.has(iconName)) return;

    const icon = completeIconSet.filter((icon) => icon.name === iconName);
    if (icon.length !== 1) {
      if (icon.length > 1)
        console.warn(`Multiple icons with name ${iconName} found.`);
      return;
    }
    if (icon) {
      this.icons.set(
        icon[0].name as IconName,
        {
          name: icon[0].name,
          data: this.getIconHtml(icon[0]),
          supportedVariants: supportedVariants[iconName],
        } as IconItemModel
      );
    }
  }

  /**
   * Get the icon model by its name
   *
   * @param name Identification name of the icon
   * @returns RTDSIconItemModel or undefined
   */
  getIcon(name: IconName): IconItemModel | undefined {
    this.setIcon(name);
    return this.icons.get(name);
  }
}
