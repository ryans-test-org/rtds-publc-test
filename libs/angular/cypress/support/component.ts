import { mount } from 'cypress/angular';
// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.ts using ES2015 syntax:
import './commands';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

export function terminalLog(violations: any) {
  cy.task(
    "log",
    `${violations.length} accessibility violation${
      violations.length === 1 ? "" : "s"
    } ${violations.length === 1 ? "was" : "were"} detected`
  );
  // pluck specific keys to keep the table readable
  const violationData = violations.map(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ({id, impact, description, nodes}) => ({
      id,
      impact,
      description,
      nodes: nodes.length
    })
  );

  cy.task("table", violationData);
}

const injectAxe = () => {
  //cy.injectAxe();
  // cy.injectAxe is currently broken. https://github.com/component-driven/cypress-axe/issues/82

  // Creating our own injection logic
  cy.readFile('../../node_modules/axe-core/axe.min.js').then((source) => {
    return cy.window({ log: false }).then((window) => {
      window.eval(source);
    });
  });
};

export const runA11y = () => {
  cy.checkA11y('', {
    runOnly: {
      type: 'tag',
      values: ['wcag2a']
    },
    rules: {
      'html-has-lang': { enabled: false },
    }
  }, terminalLog)
}

Cypress.Commands.add('mount', mount);
Cypress.Commands.overwrite('injectAxe', injectAxe);
Cypress.Commands.add('runA11y', runA11y);

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount,
      runA11y: typeof runA11y
    }
  }
}
