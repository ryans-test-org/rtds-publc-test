import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ContainerComponent } from "./components/container/container.component";
import { BannerComponentModule } from "./components/banner/banner.component.module";
import { IconComponentModule } from "./components/icon/icon.component.module";
import { PanelComponentModule } from "./components/panel/panel.component.module";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PanelComponentModule,
    IconComponentModule,
    BannerComponentModule
  ],
  declarations: [
    ContainerComponent
  ],
  exports: [
    ContainerComponent,
    PanelComponentModule,
    BannerComponentModule,
    IconComponentModule
  ]
})
export class ComponentsModule {
}
