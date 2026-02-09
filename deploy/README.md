# Production Deployment (Docker Compose)

This document describes how to deploy **Media Asset Annotator** in **production** using **Docker Compose** with environment-based configuration.

The setup uses:

- one **UI container** (React + nginx, SPA fallback)
- one **proxy nginx container** (base-path routing via `proxy_pass`)
- runtime configuration injected via `.env`

No rebuild is required when changing base paths or API URLs.

---

## Prerequisites

- Docker 20+
- Docker Compose v2+
- Ports you plan to use are free on the host

---

## Deployment Steps

### 0️⃣ Choose Deployment Setup

Decide on the deployment setup for your environment:

- **Standalone**: Deploy only the UI and proxy containers.

```bash
cd standalone
```

- **Full**: Deploy the entire system, including backend services.

```bash
cd full
```

### 1️⃣ Create `.env` file

The environment variables are split into two files for better organization:

- `.env` for UI and proxy configuration
- `.env.shared` for shared configuration across all services (used in the full setup) <br/>
  Copy the example file and adjust values for your environment:

```bash
cat .env.example ../shared/envs/.env.shared.example >.env
```

Edit .env and fill in all required variables. Descriptions are provided in the file as comments.

### 2️⃣ Start the stack

Run Docker Compose with the env file:

```bash
docker compose --env-file .env up -d
```

### 3️⃣ Access the application

Open the application in your browser:

- `http://<host>:<port>/<basePath>/`
  ⚠️ Trailing slash is mandatory
