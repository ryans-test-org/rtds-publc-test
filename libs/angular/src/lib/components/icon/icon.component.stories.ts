import { CommonModule } from '@angular/common';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { completeIconSet } from '@rtds/icons';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { IconComponent } from './icon.component';
import { IconVariants, IconSizes } from './model/icon-component.model';
import { ComponentsModule } from '../../components.module';

const meta: Meta<IconComponent> = {
  title: 'Components/Icon',
  component: IconComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ComponentsModule],
    }),
  ],
  parameters: {
    badges: [BADGE.BETA],
  },
  argTypes: {
    size: {
      options: Object.values(IconSizes),
      control: { type: 'radio' },
    },
    type: {
      options: completeIconSet.map((icon) => icon.name),
      control: { type: 'select' },
    },
    variant: {
      options: Object.values(IconVariants),
      control: { type: 'select' },
    },
  },
};

export default meta;
type Story = StoryObj<IconComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<rtds-icon [size]="size" [type]="type" [variant]="variant"></rtds-icon>`,
  }),
  args: {
    size: 'default',
    type: completeIconSet[0].name,
    variant: IconVariants.INFO,
  },
};

export const Small: Story = {
  render: (args) => ({
    props: args,
    template: `<rtds-icon [size]="size" [type]="type" [variant]="variant"></rtds-icon>`,
  }),
  args: {
    size: 'small',
    type: completeIconSet[0].name,
    variant: IconVariants.INFO,
  },
};

export const Large: Story = {
  render: (args) => ({
    props: args,
    template: `<rtds-icon [size]="size" [type]="type" [variant]="variant"></rtds-icon>`,
  }),
  args: {
    size: 'large',
    type: completeIconSet[0].name,
    variant: IconVariants.INFO,
  },
};

export const DefaultWithoutSize: Story = {
  render: (args) => ({
    props: args,
    template: `<rtds-icon [size]="size" [type]="type" [variant]="variant"></rtds-icon>`,
  }),
  args: {
    type: completeIconSet[0].name,
  },
};
