import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import { MediaAssetAnnotatorPage } from '../pages/MediaAssetAnnotatorPage.tsx';

export const AppRouter = () => {
    const DEMO_URL = import.meta.env.VITE_DEMO_MEDIA_URL;
    return (
    <BrowserRouter>
      <Routes>
          <Route
              path="/"
              element={
                  <Navigate
                      to={`/annotator?url=${encodeURIComponent(DEMO_URL)}`}
                      replace
                  />
              }
          />
        <Route path="/annotator" element={<MediaAssetAnnotatorPage />} />
      </Routes>
    </BrowserRouter>
  );
};
