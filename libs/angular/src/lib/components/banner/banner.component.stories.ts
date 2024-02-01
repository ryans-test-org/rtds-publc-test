import { CommonModule } from "@angular/common";
import { BADGE } from "@geometricpanda/storybook-addon-badges";
import { TextContent, TextContentShort } from "@rtds/storybook-helpers";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { ComponentsModule } from "../../components.module";
import { BannerComponent, Banners } from "./banner.component";

const meta: Meta<BannerComponent> = {
  title: "Components/Banner",
  component: BannerComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ComponentsModule]
    })
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
type Story = StoryObj<BannerComponent>;
const description = TextContent;
const shortDescription = TextContentShort;
export const Page: Story = {
  render: (args) => ({
    props: args,
    template: `<rtds-banner [variant]="variant" [title]="title">
            ${description}
      </rtds-banner>`
  }),
  args: {
    variant: Banners.default,
    title: 'Banner title'
  },
  argTypes: {
    variant: {
      options: Object.values(Banners),
      control: { type: "select" }
    }
  }
};

export const Global: Story = {
  render: (args) => ({
    props: args,
    template: `<rtds-banner [variant]="variant" [title]="title" [isGlobal]="isGlobal">
            ${description}
      </rtds-banner>`
  }),
  args: {
    variant: Banners.default,
    title: 'Banner title',
    isGlobal: true,
  },
  argTypes: {
    variant: {
      options: Object.values(Banners).filter((banner) => banner !== 'bestPractice'),
      control: { type: "select" }
    }
  }
};

export const InPanel: Story = {
  render: (args) => ({
    props: args,
    template: `
      <rtds-panel>
        <rtds-panel-content>
          <rtds-banner [variant]="variant" [title]="title">
                  ${description}
          </rtds-banner>
        </rtds-panel-content>
      </rtds-panel>`
  }),
  args: {
    variant: Banners.default,
    title: 'Banner title'
  },
  argTypes: {
    variant: {
      options: Object.values(Banners),
      control: { type: "select" }
    }
  }
};


export const Local: Story = {
  render: (args) => ({
    props: args,
    template: `<rtds-banner [variant]="variant" [title]="title" [isLocal]="isLocal">
            ${shortDescription}
      </rtds-banner>`
  }),
  args: {
    variant: Banners.default,
    title: 'Banner title',
    isLocal: true,
  },
  argTypes: {
    variant: {
      options: Object.values(Banners).filter((banner) => banner !== 'bestPractice'),
      control: { type: "select" }
    }
  }
};


export const Clickable: Story = {
  render: (args) => ({
    props: args,
    template: `<rtds-banner (bannerClick)="bannerClick()" [variant]="variant" [title]="title" [isClickable]="isClickable">
            ${description}
      </rtds-banner>`
  }),
  args: {
    variant: Banners.default,
    title: 'Banner title',
    isClickable: true,
  },
  argTypes: {
    variant: {
      options: Object.values(Banners).filter((banner) => banner !== 'bestPractice'),
      control: { type: "select" },
      bannerClick: { action: 'clicked' },
    }
  }
};
