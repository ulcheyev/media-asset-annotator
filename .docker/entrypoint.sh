#!/bin/sh
set -eu

envsubst \
  '$ANNOTATIONS_FETCH_API_URL \
   $MEDIA_ASSET_FETCH_API_URL \
   $DEMO_MEDIA_URL' \
  < /usr/share/nginx/html/runtime-env.js \
  > /tmp/runtime-env.js

mv /tmp/runtime-env.js \
   /usr/share/nginx/html/runtime-env.js

exec "$@"
