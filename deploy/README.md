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

### 1️⃣ Create `.env` file

Copy the example file and adjust values for your environment:

```bash
cp .env.example .env
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
