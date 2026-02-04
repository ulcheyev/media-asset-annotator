import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MediaAssetAnnotatorPage } from '../pages/MediaAssetAnnotatorPage.tsx';
import { runtimeConfig } from '../utils/runtimeConfig.ts';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={`/annotator?url=${encodeURIComponent(runtimeConfig.DEMO_MEDIA_URL)}`}
              replace
            />
          }
        />
        <Route path="/annotator" element={<MediaAssetAnnotatorPage />} />
      </Routes>
    </BrowserRouter>
  );
};
