import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MediaAssetAnnotatorPage } from '../pages/annotatorPage/MediaAssetAnnotatorPage.tsx';
import { runtimeConfig } from '../utils/runtimeConfig.ts';
import { MediaAssetsListPage } from '../pages/listPage/MediaAssetsListPage.tsx';

export const AppRouter = () => {
  return (
    <BrowserRouter basename={runtimeConfig.BASE_PATH}>
      <Routes>
        <Route path="/" element={<Navigate to="/list" replace />} />
        <Route path="/list" element={<MediaAssetsListPage />} />
        <Route path="/asset" element={<MediaAssetAnnotatorPage />} />
      </Routes>
    </BrowserRouter>
  );
};
