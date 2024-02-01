import { TestBed } from "@angular/core/testing";
import { completeIconSet } from "@rtds/icons";
import { IconComponent } from "./icon.component";
import { IconSizes } from "./model/icon-component.model";

describe(IconComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(IconComponent, {
      add: {
        imports: [],
        providers: [],
      },
    });
  });

  it("renders", () => {
    cy.mount(IconComponent);
  });

  describe('Component accessibility tests', () => {
    beforeEach(() => {
      cy.mount(IconComponent);
      cy.injectAxe();
    });

    it('Should have no accessibility violations',() => {
      cy.runA11y();
    })
  });

  describe('Component attribute tests', () => {
    completeIconSet.forEach(icon => {
      it(`for icon ${icon.name}`, () => {
        cy.mount(`<rtds-icon [type]="'${icon.name}'"></rtds-icon>`, {
          declarations: [IconComponent],
        });
        cy.get("svg").should("have.class", `js-icon-${icon.name}`).should("have.attr", "viewBox").and("include", "0 0 24 24");
        cy.get("svg").should("have.attr", "height").and("include", "20px");
        cy.get("svg").should("have.attr", "width").and("include", "20px");
      });
    });
  })

  it("icon should set standard size by default", () => {
    cy.mount(`<rtds-icon [type]="'add'"></rtds-icon>`, {
      declarations: [IconComponent],
    });
    cy.get("svg").should("have.attr", "width").and("include", "20px");
    cy.get("svg").should("have.attr", "height").and("include", "20px");
  });

  it("icon should set small size", () => {
    cy.mount(`<rtds-icon [type]="'add'" [size]="'${IconSizes.small}'"></rtds-icon>`, {
      declarations: [IconComponent],
    });
    cy.get("svg").should("have.attr", "width").and("include", "16px");
    cy.get("svg").should("have.attr", "height").and("include", "16px");
  });

  it("icon should set large size", () => {
    cy.mount(`<rtds-icon [type]="'add'" [size]="'${IconSizes.large}'"></rtds-icon>`, {
      declarations: [IconComponent],
    });
    cy.get("svg").should("have.attr", "width").and("include", "24px");
    cy.get("svg").should("have.attr", "height").and("include", "24px");
  });

});
