import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MediaAssetAnnotatorPage } from '../pages/MediaAssetAnnotatorPage.tsx';
import { runtimeConfig } from '../utils/runtimeConfig.ts';
const basePath = import.meta.env.VITE_BASE_PATH;

export const AppRouter = () => {
  return (
    <BrowserRouter basename={basePath}>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={`/asset?url=${encodeURIComponent(runtimeConfig.DEMO_MEDIA_URL)}`}
              replace
            />
          }
        />
        <Route path={`/asset`} element={<MediaAssetAnnotatorPage />} />
      </Routes>
    </BrowserRouter>
  );
};
