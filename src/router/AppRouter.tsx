import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MediaAssetAnnotatorPage } from '../pages/MediaAssetAnnotatorPage.tsx';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/annotator" element={<MediaAssetAnnotatorPage />} />
      </Routes>
    </BrowserRouter>
  );
};
