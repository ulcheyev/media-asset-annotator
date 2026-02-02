# Media Asset Annotator
Media Asset Annotator is a web-based application for creating **SVG-based annotations**
on media assets such as images and video using a canvas-based rendering model.
This repository contains the **frontend module** of the Media Asset Annotator system
and is designed to work with the **Media Asset Annotator Service** backend.

[![Vercel Deploy](https://deploy-badge.vercel.app/vercel/media-asset-annotator?style=for-the-badge&name=vercel+demo)](https://media-asset-annotator.vercel.app)
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
Open your browser and navigate to `http://localhost:5173/annotator?id=1 to access the application.

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
This will start a local server to serve the files from the `dist` directory.
Navigate to `http://localhost:4173/annotator?id=<id>` or `https://localhost:4173/annotator?url=<url>` to view the production build.
