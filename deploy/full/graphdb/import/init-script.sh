#!/bin/sh
set -e

GRAPHDB_USER="admin"
GRAPHDB_CRED="root"

echo "Waiting for GraphDB to be ready..."

until curl -s -u "$GRAPHDB_USER:$GRAPHDB_CRED" \
  http://graphdb:7200/rest/repositories > /dev/null; do
  sleep 2
done

echo "GraphDB is up."

# Check if repository exists
if curl -s -u "$GRAPHDB_USER:$GRAPHDB_CRED" \
  http://graphdb:7200/rest/repositories | grep -q '"id":"media-assets"'; then
  echo "Repository already exists. Skipping creation."
else
  echo "Creating repository..."
  curl -u "$GRAPHDB_USER:$GRAPHDB_CRED" \
       -X POST \
       -H "Content-Type: multipart/form-data" \
       -F "config=@/init/repository.ttl" \
       http://graphdb:7200/rest/repositories
  echo "Repository created."
fi

echo "Uploading ontology schema..."

curl -u "$GRAPHDB_USER:$GRAPHDB_CRED" \
     -X POST \
     -H "Content-Type: text/turtle" \
     --data-binary @/init/ontology.ttl \
     http://graphdb:7200/repositories/media-assets/statements

echo "Init finished."
