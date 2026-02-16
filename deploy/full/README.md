## 🔵 Full Deployment – Additional Information

### GraphDB

- GraphDB is available at http://localhost:7200
- Default credentials:
    - **Username:** `admin`
    - **Password:** `root`
- The repository is initialized automatically during startup.

---

### MediaCMS

- MediaCMS is accessible at (default) http://localhost:2080
- Admin credentials are defined in `.env`:
    - `MEDIA_CMS_ADMIN_USER`
    - `MEDIA_CMS_ADMIN_PASSWORD`
    - `MEDIA_CMS_ADMIN_EMAIL`
- PostgreSQL database is automatically configured via Docker.

---

### Notes

- All public access goes through the Gateway (`localhost:2030`).
- MediaCMS is also directly accessible on port `2080` for administration.
- Internal service communication uses Docker network hostnames.

