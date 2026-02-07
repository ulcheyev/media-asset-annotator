import type {MediaAsset} from "../types/intern/media.ts";
import {runtimeConfig} from "../utils/runtimeConfig.ts";
import {mockMediaAssetList} from "./mocks/mediaAssetList.ts";

export const fetchMediaAssetList = async (
    listId: string,
): Promise<MediaAsset[]> => {
    if (runtimeConfig.USE_MOCK_DATA) {
        console.warn('[fetchMediaAssetList] MOCK mode – returning mock asset list');
        return mockMediaAssetList;
    }

    const response = await fetch(
        `${runtimeConfig.MEDIA_ASSETS_LIST_API_URL}?id=${listId}`,
    );

    if (!response.ok) {
        throw new Error('Failed to fetch media asset list');
    }

    return response.json();
};
