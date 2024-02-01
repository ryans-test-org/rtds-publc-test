import type { Meta, StoryObj } from '@storybook/angular';
import { RTDSWelcomeComponent } from './rtds-welcome.component';

const meta: Meta<RTDSWelcomeComponent> = {
  component: RTDSWelcomeComponent,
  title: 'Welcome',
};

export default meta;
type Story = StoryObj<RTDSWelcomeComponent>;

export const Docs: Story = {
  render: (args) => ({
    props: args
  }),
};
