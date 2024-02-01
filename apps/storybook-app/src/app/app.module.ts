import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModule } from '@rtds/angular';
import { AppComponent } from './app.component';
import { RTDSWelcomeComponent } from './rtds-welcome.component';

@NgModule({
  declarations: [AppComponent, RTDSWelcomeComponent],
  imports: [BrowserModule, ComponentsModule, CommonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
