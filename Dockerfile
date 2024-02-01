ARG GO_DEPENDENCY_LABEL_BASE_NODEJS20
FROM eu.gcr.io/at-artefacts/platform-base-nodejs20:$GO_DEPENDENCY_LABEL_BASE_NODEJS20 as build

ARG GO_PIPELINE_COUNTER
ARG GO_PIPELINE_NAME
ARG GO_STAGE_NAME
ARG GO_STAGE_COUNTER
ARG GO_JOB_NAME
ARG GO_API_AUTH_TOKEN

USER root
# Installing chromium for cypress
RUN dnf install --assumeyes chromium
RUN yum install -y xorg-x11-server-Xvfb \
     zip \
     gtk2-devel \
     gtk3-devel \
     libnotify-devel \
     GConf2 \
     nss \
     libXScrnSaver \
     alsa-lib &&  \
    yum -y -q clean all

RUN mkdir -p $APP_DIR/dist && \
    chown -R atcloud:atcloud $APP_DIR


USER atcloud

COPY --chown=atcloud:atcloud .npmrc package*.json $APP_DIR/
RUN npm install

COPY --chown=atcloud:atcloud . $APP_DIR

# Install cypress itself
#RUN ./node_modules/cypress/bin/cypress install
#RUN ./node_modules/cypress/bin/cypress info
#RUN ./node_modules/.bin/cypress verify


ENV CHROME_BIN=/usr/bin/chromium-browser

# NX envs
ARG NX_BRANCH
ENV NX_BRANCH $NX_BRANCH
ENV NX_DAEMON=false
ARG NX_CLOUD_ACCESS_TOKEN
ENV NX_CLOUD_ACCESS_TOKEN $NX_CLOUD_ACCESS_TOKEN

# Afftected git hashes
ARG GO_TO_REVISION_RETAILER_TOOLS_STORYBOOK
ENV GO_TO_REVISION_RETAILER_TOOLS_STORYBOOK $GO_TO_REVISION_RETAILER_TOOLS_STORYBOOK

ARG GO_FROM_REVISION_RETAILER_TOOLS_STORYBOOK
ENV GO_FROM_REVISION_RETAILER_TOOLS_STORYBOOK $GO_FROM_REVISION_RETAILER_TOOLS_STORYBOOK


# #RUN npm run lint:styles && \
# #RUN npx nx affected:lint --nx-bail=true --parallel=5 --base=${GO_FROM_REVISION_RETAILER_TOOLS_STORYBOOK}~1 --head=$GO_TO_REVISION_RETAILER_TOOLS_STORYBOOK && \
# #npx nx affected:test --nx-bail=true --parallel=5 --base=${GO_FROM_REVISION_RETAILER_TOOLS_STORYBOOK}~1 --head=$GO_TO_REVISION_RETAILER_TOOLS_STORYBOOK
# #
# #RUN npx nx affected -t component-test --nx-bail=true --base=${GO_FROM_REVISION_RETAILER_TOOLS_STORYBOOK}~1 --head=$GO_TO_REVISION_RETAILER_TOOLS_STORYBOOK \
# #    || (cp -r $APP_DIR/dist/cypress /usr/local/autotrader/app/cypressoutput && ls -a -l $AT_BASE_DIR && pkill Xvfb && exit 1)
# #

# # LINT / TEST / BUILD
RUN npm run lint:styles && \
npx nx affected:test --nx-bail=true --parallel=5 --base=${GO_FROM_REVISION_RETAILER_TOOLS_STORYBOOK}~1 --head=$GO_TO_REVISION_RETAILER_TOOLS_STORYBOOK && \
    npx nx component-test angular || \
   ((zip -rq ./cypress-results.zip $APP_DIR/cypressoutput || true)  && \
       (curl "https://go.atcloud.io/go/files/${GO_PIPELINE_NAME}/${GO_PIPELINE_COUNTER}/${GO_STAGE_NAME}/${GO_STAGE_COUNTER}/${GO_JOB_NAME}"  -H "Authorization: bearer $GO_API_AUTH_TOKEN" -H 'Confirm:true' -F 'zipfile=@./cypress-results.zip' || true) && \
       exit 1)

RUN npm run storybook:build && \
  rm -rf .angular && \
  rm -rf node_modules

# # # Stage 2 - the preprod environment
FROM eu.gcr.io/at-artefacts/platform-base-nodejs20:$GO_DEPENDENCY_LABEL_BASE_NODEJS20 as runtime
ENV NODE_ENV "production"
COPY --chown=atcloud:atcloud --from=build /usr/local/autotrader/app/server $APP_DIR
COPY --chown=atcloud:atcloud --from=build /usr/local/autotrader/app/dist/storybook/storybook-app $APP_DIR/dist
COPY --chown=atcloud:atcloud tools/scripts $APP_DIR/tools/scripts
COPY --chown=atcloud:atcloud .npmrc $APP_DIR

# We need to run this again to install the express server
RUN npm i

ENV APP_DIR "retailer-tools-design-system"
ENV GO_PIPELINE_COUNTER $GO_PIPELINE_COUNTER
ENV CACHE_BUST $GO_PIPELINE_COUNTER

CMD ["node", "serve.js"]
