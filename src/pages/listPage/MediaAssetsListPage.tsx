import { useEffect, useState } from "react";
import type { MediaAsset } from "../../types/intern/media";
import { fetchMediaAssetList } from "../../api/fetchMediaAssetList";
import { MediaAssetsTable } from "../../features/list/table/MediaAssetsTable";
import { ErrorStatus } from "../../features/pageStatus/ErrorStatus";
import { LoadingStatus } from "../../features/pageStatus/LoadingStatus";
import { useQueryParams } from "../../utils/hooks/useQueryParams";
import { mediaAssetsListParams } from "./listPage.params";

export const MediaAssetsListPage = () => {
    const { params, ready, missingRequired } =
        useQueryParams(mediaAssetsListParams);

    const [data, setData] = useState<MediaAsset[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const listId = params?.id ?? null;

    useEffect(() => {
        if (!ready || missingRequired || !listId) {
            return;
        }

        let cancelled = false;

        setLoading(true);
        setError(null);

        fetchMediaAssetList(listId)
            .then((assets) => {
                if (!cancelled) {
                    setData(assets);
                }
            })
            .catch((err) => {
                if (!cancelled) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : "Failed to load media assets list"
                    );
                }
            })
            .finally(() => {
                if (!cancelled) {
                    setLoading(false);
                }
            });

        return () => {
            cancelled = true;
        };
    }, [ready, missingRequired, listId]);

    if (!ready) {
        return null; // URL normalization in progress
    }

    if (missingRequired) {
        return (
            <ErrorStatus
                title="Missing list ID"
                description="The URL must contain ?id=..."
            />
        );
    }

    if (loading) {
        return (
            <LoadingStatus
                title="Loading media assets list"
                description="Please wait…"
            />
        );
    }

    if (error) {
        return (
            <ErrorStatus
                title="Failed to load media assets list"
                description={error}
            />
        );
    }

    return <MediaAssetsTable data={data} />;
};
