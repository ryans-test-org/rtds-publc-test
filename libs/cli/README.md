# cli - beta

### Steps for testing CLI implementation
1. Set up a new project
2. Do basic project setup stuff, `npm init` and `git init` at a minimum.
3. Install `sudo npm i -g @rtds/cli@1.0.1-alpha.0` - (you may need to setup the `@rtds` registry in the global npm config, run `npm config set @rtds:registry = https://autotrader.jfrog.io/autotrader/api/npm/NPM_GROUP/` outside of the project you're setting up)
4. Run `rtds-cli init`
5. Choose custom setup, Tooling (style/component packages don't exist yet, so will fail)

The CLI should succeed and you should see:
1. .npmrc file created
2. .gitignore created
3. .rtdsconfig created with config
4. .husky directory and several hooks created
5. .stylelintrc file created in the root of project
6. `lint:styles` script added to `package.json`
7. Stylelint packages added to `package.json`

If you push changes to your new git repo, or make some changes directly in the github website and pull, hooks should fire and you should see terminal output checking CLI + package versions 

## Running lint

Run `nx lint cli` to execute the lint via [ESLint](https://eslint.org/).


