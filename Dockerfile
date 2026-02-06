########################################
# 1. Dependencies
########################################
FROM node:20-alpine AS deps

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund


########################################
# 2. Build
########################################
FROM node:20-alpine AS build

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build


########################################
# 3. Runtime (nginx)
########################################
FROM nginx:1.25-alpine

# Copy build output
COPY --from=build /app/dist /var/www

# Copy custom JS config
COPY .docker/runtime-env.template.js /etc/nginx/runtime-env.template.js

# Copy entrypoint
COPY .docker/entrypoint.sh /entrypoint.sh

# Copy nginx configuration
COPY .docker/nginx.conf /etc/nginx/nginx.conf

RUN chmod +x /entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
