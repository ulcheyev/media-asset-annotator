import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './styles/index.css';
import {AppRouter} from './router/AppRouter';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="h-screen w-screen flex flex-col bg-neutral-900">
      <AppRouter />
    </div>
  </StrictMode>,
);
