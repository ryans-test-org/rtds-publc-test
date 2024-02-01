import { CommonModule } from "@angular/common";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { ComponentsModule } from "../../../../components.module";
import { PanelContentComponent } from "./panel-content.component";
import { TextContent } from "@rtds/storybook-helpers";

const meta: Meta<PanelContentComponent> = {
  title: "Components/Panel/Content",
  component: PanelContentComponent,
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
type Story = StoryObj<PanelContentComponent>;
const description = TextContent;
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <rtds-panel>
          <rtds-panel-content>
              ${description}
          </rtds-panel-content>
      </rtds-panel>`
  })
};
