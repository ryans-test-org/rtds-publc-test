import { CommonModule } from "@angular/common";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import { TextContent, TextTerms } from "@rtds/storybook-helpers";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { PanelComponent, PanelVariants } from "./panel.component";
import { ComponentsModule } from "../../components.module";

const meta: Meta<PanelComponent> = {
  title: "Components/Panel",
  component: PanelComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ComponentsModule]
    })
    //   componentWrapperDecorator(
    //     (story) => `
    //   <rtds-layout-header>Container</rtds-layout-header>
    //   ${story}
    // `
    //   ),
  ],
  parameters: {
    badges: [BADGE.BETA],
    designToken: {
      styleInjection: `/**
* @tokens BorderRadius
* @presenter BorderRadius
*/

--rtds-border-radius-default-radius: 4px;`
    }
  }
};

export default meta;
type Story = StoryObj<PanelComponent>;
const description = TextContent;
const supplementary = TextTerms;
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<rtds-panel [variant]="variant">
        <rtds-panel-content>
            ${description}
        </rtds-panel-content>
      </rtds-panel>`
  }),
  args: {
    variant: "standard"
  },
  argTypes: {
    variant: {
      options: Object.values(PanelVariants),
      control: { type: "select" }
    }
  }
};

export const WithHeader: Story = {
  render: (args) => ({
    props: args,
    template: `<rtds-panel [variant]="variant">
            <rtds-panel-header [title]="'Title'"><a href="#" action>Action</a></rtds-panel-header>
        <rtds-panel-content>
            ${description}
        </rtds-panel-content>
      </rtds-panel>`
  }),
  args: {
    variant: "standard"
  },
  argTypes: {
    variant: {
      options: Object.values(PanelVariants),
      control: { type: "select" }
    }
  }
};

export const WithActions: Story = {
  render: (args) => ({
    props: args,
    template: `<rtds-panel [variant]="variant">
        <rtds-panel-header [title]="'Title'"><a href="#" action>Action</a></rtds-panel-header>
        <rtds-panel-content>
            ${description}
        </rtds-panel-content>
        <rtds-panel-content [subtitle]="'Subtitle'">
            <a href="#" action>Subtitle action</a>
            ${description}
        </rtds-panel-content>
      </rtds-panel>`
  }),
  args: {
    variant: "standard"
  },
  argTypes: {
    variant: {
      options: Object.values(PanelVariants),
      control: { type: "select" }
    }
  }
};

export const PanelFooter: Story = {
  render: (args) => ({
    props: args,
    template: `<rtds-panel [variant]="variant">
        <rtds-panel-content>
            ${description}
        </rtds-panel-content>
        <rtds-panel-footer>
            <button action>Button</button>
        </rtds-panel-footer>
      </rtds-panel>`
  }),
  args: {
    variant: "standard"
  },
  argTypes: {
    variant: {
      options: Object.values(PanelVariants),
      control: { type: "select" }
    }
  }
};

export const PanelSupplementary: Story = {
  render: (args) => ({
    props: args,
    template: `<rtds-panel [variant]="variant">
        <rtds-panel-content>
            ${description}
        </rtds-panel-content>
        <rtds-panel-supplementary>
            <div>${supplementary}</div>
            <button action>Button</button>
        </rtds-panel-supplementary>
      </rtds-panel>`
  }),
  args: {
    variant: "standard"
  },
  argTypes: {
    variant: {
      options: Object.values(PanelVariants),
      control: { type: "select" }
    }
  }
};

export const MultiplePanels: Story = {
  render: (args) => ({
    props: args,
    template: `
      <rtds-panel [variant]="variant">
        <rtds-panel-header [title]="'Title'"><a href="#" action>Action</a></rtds-panel-header>
        <rtds-panel-content>
            ${description}
        </rtds-panel-content>
        <rtds-panel-content [subtitle]="'Subtitle'">
            <a href="#" action>Subtitle action</a>
            ${description}
        </rtds-panel-content>
      </rtds-panel>
            <rtds-panel [variant]="variant">
        <rtds-panel-header [title]="'Title'"><a href="#" action>Action</a></rtds-panel-header>
        <rtds-panel-content>
            ${description}
        </rtds-panel-content>
        <rtds-panel-content [subtitle]="'Subtitle'">
            <a href="#" action>Subtitle action</a>
            ${description}
        </rtds-panel-content>
      </rtds-panel>`
  }),
  args: {
    variant: "standard"
  },
  argTypes: {
    variant: {
      options: Object.values(PanelVariants),
      control: { type: "select" }
    }
  }
};
