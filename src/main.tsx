import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { AppRouter } from './router/AppRouter';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="h-screen w-screen flex flex-col bg-neutral-900">
      <header className="h-12 px-4 flex items-center border-b border-neutral-700 text-white">
        Media Asset Annotator
      </header>
        <AppRouter />
    </div>
  </StrictMode>,
);
