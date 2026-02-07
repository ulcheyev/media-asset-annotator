# Media Asset Annotator

Media Asset Annotator is a web-based application for creating **SVG-based annotations**
on media assets such as images and video using a canvas-based rendering model.
This repository contains the **frontend module** of the Media Asset Annotator system
and is designed to work with the [Media Asset Annotator Server](https://github.com/ulcheyev/media-asset-annotator-server) on backend side.

## [![Vercel Deploy](https://deploy-badge.vercel.app/vercel/media-asset-annotator?name=vercel+demo)](https://media-asset-annotator.vercel.app)

![Build (main)](https://github.com/ulcheyev/media-asset-annotator/actions/workflows/build-and-push.yml/badge.svg?branch=main)

---

### Application Entry

The application uses **client-side routing**.  

- `/` → redirects to a media assets `/list` page (the `?id` param of list is required)
- `/<basePath>/asset?id=<mediaAssetId>` → loads a media asset from the backend
- `/<basePath>/asset?url=<mediaUrl>` → loads an external media asset by URL

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

### Run Production Server

In order to run the application in production mode refer to the [deployment instructions](deploy/README.md).


### Prerequisites

- Node.js (v24+)

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
