/// <reference types="Cypress" />
import { TestBed } from '@angular/core/testing';
import { PanelComponent } from './panel.component';
describe(PanelComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(PanelComponent, {
      add: {
        imports: [],
        providers: [],
      },
    });
  });

  it('renders', () => {
    cy.mount(PanelComponent, {
      componentProperties: {
        variant: 'standard'
      },
    });
  });
});
