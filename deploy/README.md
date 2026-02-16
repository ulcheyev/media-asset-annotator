# Media Asset Annotator Deployment

This project provides two deployment options:

1. **Standalone mode** – UI only
2. **Full stack mode** – UI + Annotator Server + GraphDB + MediaCMS

---

## Quick Start

0. Pick a deployment option (standalone or full)
1. Copy example of env file
```bash
cd deploy/<option>
cp .env.example .env
```
2. Edit .env file
3. Run application
```bash
docker compose --env-file .env up --build -d 
```
4. App available at: http://localhost:2030/annotator (default)
5. For detailed configuration and architecture description of full deployment see [Full Deployment Docs](full/README.md)