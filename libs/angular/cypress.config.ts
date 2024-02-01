import { nxComponentTestingPreset } from '@nx/angular/plugins/component-testing';
import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    ...nxComponentTestingPreset(__filename),
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          // eslint-disable-next-line no-console
          console.log(message)
          return null
        },
        table(message) {
          // eslint-disable-next-line no-console
          console.table(message)
          return null
        }
      });
      return {
        ...config,
        screenshotsFolder: config.projectRoot +'../../../cypressoutput',
        video: false,
      }
    },
  },
  env: {
    codeCoverageTasksRegistered: true,
  },
  // screenshotsFolder: '../../coverage/libs/angular/screenshots',
  // videosFolder: '../../coverage/libs/angular/videos'
});
