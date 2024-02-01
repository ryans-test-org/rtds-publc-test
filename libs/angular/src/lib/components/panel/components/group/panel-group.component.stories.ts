import { CommonModule } from "@angular/common";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { ComponentsModule } from "../../../../components.module";
import { PanelGroupComponent } from "./panel-group.component";
import { TextContent } from "@rtds/storybook-helpers";

const meta: Meta<PanelGroupComponent> = {
  title: "Components/Panel/Group",
  component: PanelGroupComponent,
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
type Story = StoryObj<PanelGroupComponent>;
const description = TextContent;
export const Default: Story = {
  name: 'Two Panels',
  render: (args) => ({
    props: args,
    template: `
      <rtds-panel-group>
        <rtds-panel>
            <rtds-panel-header [title]="'Title'"></rtds-panel-header>
            <rtds-panel-content>
                ${description}
            </rtds-panel-content>
        </rtds-panel>
        <rtds-panel>
            <rtds-panel-header [title]="'Title'"></rtds-panel-header>
            <rtds-panel-content>
                ${description}
            </rtds-panel-content>
        </rtds-panel>
      </rtds-panel-group>
     `
  })
};

export const ThreePanels: Story = {
  render: (args) => ({
    props: args,
    template: `
      <rtds-panel-group>
        <rtds-panel>
            <rtds-panel-header [title]="'Title'"></rtds-panel-header>
            <rtds-panel-content>
                ${description}
            </rtds-panel-content>
        </rtds-panel>
        <rtds-panel>
            <rtds-panel-header [title]="'Title'"></rtds-panel-header>
            <rtds-panel-content>
                ${description}
            </rtds-panel-content>
        </rtds-panel>
        <rtds-panel>
            <rtds-panel-header [title]="'Title'"></rtds-panel-header>
            <rtds-panel-content>
                ${description}
            </rtds-panel-content>
        </rtds-panel>
      </rtds-panel-group>
     `
  })
};
