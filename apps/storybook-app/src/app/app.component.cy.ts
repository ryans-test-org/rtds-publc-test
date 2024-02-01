import { TestBed } from '@angular/core/testing';
import { AppComponent } from "./app.component";

describe(AppComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(AppComponent, {
      add: {
        imports: [],
        providers: [],
      },
    });
  });
});
