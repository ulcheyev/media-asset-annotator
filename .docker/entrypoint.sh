#!/bin/sh
set -eu

envsubst \
  '${ANNOTATIONS_FETCH_API_URL} \
   ${MEDIA_ASSET_FETCH_API_URL} \
   ${DEMO_MEDIA_URL} \
   ${BASE_PATH}' \
  < /etc/nginx/runtime-env.template.js \
  > /usr/share/nginx/html/runtime-env.js

exec "$@"
