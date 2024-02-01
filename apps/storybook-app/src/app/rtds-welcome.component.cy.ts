import { TestBed } from '@angular/core/testing';
import { RTDSWelcomeComponent } from './rtds-welcome.component';

describe(RTDSWelcomeComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(RTDSWelcomeComponent, {
      add: {
        imports: [],
        providers: [],
      },
    });
  });

  it('renders', () => {
    cy.mount(RTDSWelcomeComponent);
  });
});
