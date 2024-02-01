import { mount } from 'cypress/angular'
import { runA11y } from "./support/component";

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount,
      runA11y: typeof runA11y
    }
  }
}
