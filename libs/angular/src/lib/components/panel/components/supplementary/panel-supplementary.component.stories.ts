import { CommonModule } from "@angular/common";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { ComponentsModule } from "../../../../components.module";
import { PanelSupplementaryComponent } from "./panel-supplementary.component";
import { TextContent, TextTerms } from "@rtds/storybook-helpers";

const meta: Meta<PanelSupplementaryComponent> = {
  title: "Components/Panel/Supplementary",
  component: PanelSupplementaryComponent,
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
type Story = StoryObj<PanelSupplementaryComponent>;
const description = TextContent;
const supplementary = TextTerms;
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <rtds-panel>
        <rtds-panel-content>
          ${description}
        </rtds-panel-content>
        <rtds-panel-supplementary>
            <div>${supplementary}</div>
            <button action>Button</button>
        </rtds-panel-supplementary>
      </rtds-panel>
`
  })
};
