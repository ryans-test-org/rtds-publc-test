import {NgModule} from "@angular/core";
import {BannerComponent} from "./banner.component";
import {CommonModule} from "@angular/common";
import { IconComponentModule } from "../icon/icon.component.module";

@NgModule({
  imports: [CommonModule, IconComponentModule],
  declarations: [BannerComponent],
  exports: [BannerComponent]
})

export class BannerComponentModule {
}
