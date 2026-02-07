#!/bin/sh
set -eu

envsubst \
  '${ANNOTATIONS_API_URL} \
   ${MEDIA_ASSET_API_URL} \
   ${MEDIA_ASSETS_LIST_API_URL} \
   ${DEMO_MEDIA_URL} \
   ${BASE_PATH} \
   ${APP_MODE}' \
  < /etc/nginx/runtime-env.template.js \
  > /var/www/runtime-env.js

exec "$@"
