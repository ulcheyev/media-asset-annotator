import type {MediaAsset, MediaLayout} from "../../../types/intern/media.ts";

export interface MediaAssetState {
    asset: MediaAsset | null;

    layout: MediaLayout;
    setLayout: (l: MediaLayout) => void;

    loading: boolean;
    error: string | null;
}
