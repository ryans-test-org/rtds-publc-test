import { CommonModule } from "@angular/common";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { ComponentsModule } from "../../../../components.module";
import { PanelHeaderComponent } from "./panel-header.component";
import { TextTitle } from "@rtds/storybook-helpers";

const meta: Meta<PanelHeaderComponent> = {
  title: "Components/Panel/Header",
  component: PanelHeaderComponent,
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
type Story = StoryObj<PanelHeaderComponent>;
export const Default: Story = {
  render: (args) => ({
    props: args,
    args: {
      variant: "standard",
      title: TextTitle
    },
    template: `
      <rtds-panel>
          <rtds-panel-header [title]="'Title'">
              <a href="#" action>Button</a>
          </rtds-panel-header>
      </rtds-panel>`
  })
};
