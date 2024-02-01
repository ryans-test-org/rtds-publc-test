import { CommonModule } from '@angular/common';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ContainerComponent } from './container.component';
import { ComponentsModule } from '../../components.module';

const meta: Meta<ContainerComponent> = {
  title: 'Layout/Container',
  component: ContainerComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ComponentsModule],
    }),
    //   componentWrapperDecorator(
    //     (story) => `
    //   <rtds-layout-header>Container</rtds-layout-header>
    //   ${story}
    // `
    //   ),
  ],
  parameters: {
    badges: [BADGE.BETA],
  },
};

export default meta;
type Story = StoryObj<ContainerComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<rtds-container [type]="type"></rtds-container>`,
  }),
  args: {
    type: 'full',
  },
  argTypes: {
    type: {
      options: ['full', 'standard', 'narrow'],
      control: { type: 'select' },
    },
  },
};
