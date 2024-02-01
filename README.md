# Retailer Tools Design System

[![storybook](https://shields.io/badge/storybook-white?logo=storybook&style=flat)](https://app.retailer-tools-design-system.preprod.k8.atcloud.io/)
[![](https://app.build-status.prod.k8.atcloud.io/api/badge/shield/pipeline/retailer-tools-storybook.svg?usePipelineNameAsLabel=true)](https://go.atcloud.io/go/tab/pipeline/history/retailer-tools-storybook)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Contents:

- [Getting started](#getting-started)
- [Contributing](https://github.atcloud.io/AutoTrader/portal-design-system/blob/master/CONTRIBUTING.md)
- [Local development](#local-development)
- [Useful Commands](#useful-commands)
- [Githooks](#githooks)
- [Testing](#testing)
- [Pipelines](#pipelines)
- [Slack support](https://autotrader.slack.com/archives/CA5K01DJA)
- [Nx](#nx)

---

## Getting started

Retailer Tools Design System (RTDS) is created using Nx and is composed of various apps and libs to create a design system that houses styles, components, and pattern visualisation/documentation.

The goals of this design system are to:

- Make a single source of truth for consumers of these artifacts
- Make it easy to version and deploy updates to the system, patterns, and components
- Create a pattern visualisation and documentation system, where we can view the current state of patterns, better understand the limitations of them, and provide meaningful guidelines for designers & developers

## Local development

To run the app locally and begin developing (files will be automatically watched for changes):

- `npm i`

- `npx nx run storybook-app:storybook`

## Useful commands

### Creating workspace

- `npx create-nx-workspace@latest retailer-tools-design-system` (Selects 'Apps'. Add —preset=ts to get the ‘packages’ structure)

- `npm install -D @nx/angular` Install nrwl/angular plugin

- `npm install -D @nx/node` Install nrwl/node plugin

### Generating apps/libs

- `npx nx g @nx/angular:library <lib-name> --buildable --publishable --importPath=@rtds/<lib-name>` Add a lib

- `npx nx g @nx/angular:app <app-name>` Add an app

- `npx nx g @nx/angular:storybook-configuration storybook-app` Add storybook configuration to an app

- `npx nx g @nx/node:library <lib-name> --importPath=@rtds/<lib-name> --unitTestRunner=none --js=true --publishable=true` Add a barebones node format package

### Generate stories

- `npx nx generate @nx/angular:stories --name=<lib-name>`

### Running

- `npx nx run storybook-app:storybook`

### Building

- `npx nx build components` - Build just the angular components

- `npx nx build patterns` - Build just the patterns

- `npx nx build-storybook storybook-app` - Build the app

## Githooks

## Testing

## Pipelines

- [retailer-tools-storybook](https://go.atcloud.io/go/pipeline/activity/retailer-tools-storybook)

## Slack support

---

## Nx

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Smart, Fast and Extensible Build System**

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`
- Web (no framework frontends)
  - `npm install --save-dev @nrwl/web`
- [Angular](https://angular.io)
  - `npm install --save-dev @nx/angular`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`
- [Express](https://expressjs.com)
  - `npm install --save-dev @nrwl/express`
- [Node](https://nodejs.org)
  - `npm install --save-dev @nx/node`

There are also many [community plugins](https://nx.dev/community) you could add.

## Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@rtds/mylib`.

## Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via Karma.

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

## ☁ Nx Cloud

### Distributed Computation Caching & Distributed Task Execution

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.
