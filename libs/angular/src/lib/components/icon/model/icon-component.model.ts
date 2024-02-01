import { IconName } from '@rtds/icons';

export enum IconSizes {
  default = 'default',
  small = 'small',
  large = 'large',
}

export type IconSize = keyof typeof IconSizes;

export enum IconVariants {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}

export interface IconContext {
  type: IconVariants;
  title: string;
  class: string;
}

export interface IconItemModel {
  name: IconName;
  data: string;
  supportedVariants: IconVariants[];
}
