# Media Asset Annotator

Media Asset Annotator is a web-based application for creating **SVG-based annotations**
on media assets such as images and video using a canvas-based rendering model.
This repository contains the **frontend module** of the Media Asset Annotator system
and is designed to work with the **Media Asset Annotator Service** backend.

## [![Vercel Deploy](https://deploy-badge.vercel.app/vercel/media-asset-annotator?style=for-the-badge&name=vercel+demo)](https://media-asset-annotator.vercel.app)

---

### Application Entry

The application uses **client-side routing**.  
A **default route (`/`)** is defined and automatically redirects to a demo annotator view.

- `/` → redirects to a predefined demo media asset
- `/annotator?id=<mediaAssetId>` → loads a media asset from the backend
- `/annotator?url=<mediaUrl>` → loads an external media asset by URL

---

## Technology Stack

### Core Framework

- React.js v19-20
- TypeScript (~5.9)

### Build

- Vite (Rolldown-based)

### Canvas & Graphics

- Konva
- React Konva

### Styling

- Tailwind CSS (v4)
- clsx

This project uses Prettier for code formatting and ESLint for linting to maintain code quality and consistency.

---

## Setup

### Prerequisites

- Node.js (v24+)
- Configuration via `.env` file in root directory (refer to `.env.example` for guidance)

### Install Dependencies

Clone the repository and install the required dependencies:

```bash
git clone <repository-url>
cd media-asset-annotator
npm install
```

### Run Development Server

Start the development server:

```bash
npm run dev
```

Access the application using one of the following URLs:

- http://localhost:5173 (default demo)
- http://localhost:5173/asset?id=<id>
- http://localhost:5173/asset?url=<url>

### Run Production Server

In order to run the application in production mode refer to the [deployment instructions](deploy/README.md).

### Build for Production

To build the application for production, run:

```bash
npm run build
```

The production-ready files will be generated in the `dist` directory.

### Preview Production Build

To preview the production build locally, run:

```bash
npm run preview
```

Access the application using one of the following URLs:

- http://localhost:4173 (default demo)
- http://localhost:4173/asset?id=<id>
- http://localhost:4173/asset?url=<url>
