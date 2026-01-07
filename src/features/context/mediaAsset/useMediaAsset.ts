import {MediaAssetContext} from "./MediaAssetContext.ts";
import {useContext} from "react";
import type {MediaAssetState} from "./MediaAssetContext.types.ts";

export const useMediaAsset = (): MediaAssetState => {
    const ctx = useContext(MediaAssetContext);
    if (!ctx) {
        throw new Error('useMediaAsset must be used inside MediaAssetProvider');
    }
    return ctx;
};