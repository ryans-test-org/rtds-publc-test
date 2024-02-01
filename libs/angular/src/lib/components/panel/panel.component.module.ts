import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PanelComponent } from "./panel.component";
import { PanelFooterComponent } from "./components/footer/panel-footer.component";
import { PanelHeaderComponent } from "./components/header/panel-header.component";
import { PanelSupplementaryComponent } from "./components/supplementary/panel-supplementary.component";
import { PanelGroupComponent } from "./components/group/panel-group.component";
import { PanelContentComponent } from "./components/content/panel-content.component";

@NgModule({
  declarations: [
    PanelComponent,
    PanelContentComponent,
    PanelGroupComponent,
    PanelHeaderComponent,
    PanelFooterComponent,
    PanelSupplementaryComponent
  ],
  imports: [CommonModule],
  exports: [
    PanelComponent,
    PanelContentComponent,
    PanelGroupComponent,
    PanelHeaderComponent,
    PanelFooterComponent,
    PanelSupplementaryComponent
  ],
  providers: [],
})
export class PanelComponentModule {}
