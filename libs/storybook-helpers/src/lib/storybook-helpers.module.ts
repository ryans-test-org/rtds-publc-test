import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutDoDontComponent } from './layouts/layout-do-dont/layout-do-dont.component';
import { LayoutHeaderComponent } from './layouts/layout-header/layout-header.component';


@NgModule({
  imports: [CommonModule],
  declarations: [
    LayoutHeaderComponent,
    LayoutDoDontComponent,
  ],
  exports: [LayoutHeaderComponent, LayoutDoDontComponent],
})
export class StorybookHelpersModule {}
