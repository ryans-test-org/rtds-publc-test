import {
  IconContext,
  IconVariants,
  IconSizes,
} from './model/icon-component.model';

export const iconContexts: Map<IconVariants, IconContext> = new Map()
  .set(IconVariants.INFO, {
    type: IconVariants.INFO,
    title: 'info icon',
    class: 'rtds-icon--info',
  })
  .set(IconVariants.WARNING, {
    type: IconVariants.WARNING,
    title: 'warning icon',
    class: 'rtds-icon--warning',
  })
  .set(IconVariants.ERROR, {
    type: IconVariants.ERROR,
    title: 'error icon',
    class: 'rtds-icon--error',
  });

export const iconSizeMap = new Map()
  .set(IconSizes.default, '20px')
  .set(IconSizes.small, '16px')
  .set(IconSizes.large, '24px');

export const supportedVariants = {
  add: [IconVariants.ERROR],
  calendar: [IconVariants.WARNING],
  close: [IconVariants.INFO, IconVariants.ERROR],
  delete: [IconVariants.INFO],
  download: [IconVariants.WARNING],
  expand: [IconVariants.INFO, IconVariants.ERROR],
  launch: [IconVariants.WARNING],
  open: [IconVariants.INFO],
  print: [IconVariants.INFO, IconVariants.ERROR],
  refresh: [IconVariants.WARNING],
  tick: [IconVariants.ERROR],
  bike: [IconVariants.INFO, IconVariants.ERROR],
  car: [IconVariants.WARNING],
  caravan: [IconVariants.INFO],
  farm: [IconVariants.INFO, IconVariants.ERROR],
  motorhome: [IconVariants.WARNING],
  plant: [IconVariants.INFO],
  truck: [IconVariants.INFO, IconVariants.ERROR],
  van: [IconVariants.ERROR],
  down: [IconVariants.INFO],
  left: [IconVariants.INFO, IconVariants.ERROR],
  right: [IconVariants.WARNING],
  up: [IconVariants.INFO],
  alert: [IconVariants.INFO, IconVariants.ERROR],
  lock: [IconVariants.ERROR],
  search: [IconVariants.WARNING],
  sterling: [IconVariants.INFO, IconVariants.ERROR],
  email: [IconVariants.INFO],
  mute: [IconVariants.INFO],
  play: [IconVariants.INFO, IconVariants.ERROR],
  stop: [IconVariants.WARNING],
  volume: [IconVariants.ERROR],
  criticalFilled: [IconVariants.INFO, IconVariants.ERROR],
  critical: [IconVariants.INFO],
  excellent: [IconVariants.WARNING],
  informationFilled: [IconVariants.INFO, IconVariants.ERROR],
  information: [IconVariants.INFO],
  success: [IconVariants.WARNING],
  warningFilled: [IconVariants.INFO, IconVariants.ERROR],
  warning: [IconVariants.WARNING],
};
