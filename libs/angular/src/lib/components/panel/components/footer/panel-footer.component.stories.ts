import { CommonModule } from "@angular/common";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { ComponentsModule } from "../../../../components.module";
import { PanelFooterComponent } from "./panel-footer.component";

const meta: Meta<PanelFooterComponent> = {
  title: "Components/Panel/Footer",
  component: PanelFooterComponent,
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
type Story = StoryObj<PanelFooterComponent>;
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <rtds-panel>
          <rtds-panel-footer>
              <button>Button</button>
          </rtds-panel-footer>
      </rtds-panel>`
  })
};
