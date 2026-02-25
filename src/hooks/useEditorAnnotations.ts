import { useEffect, useState } from "react";
import type {Annotation, AnnotationPatch} from "../types/intern/annotation.ts";
import {fetchAnnotations, patchMediaAssetWithAnnotations} from "../api/annotationsApi.ts";
import {Constants} from "../utils/Constants.ts";
import {
    getPolylineAnnotationFromAnnotationData,
    getTextAnnotationFromAnnotationData
} from "../types/mapper/annotationMapper.ts";
import {isAnnotationVisible} from "../utils/mediaAsset.utils.ts";
import {toAnnotationDataArray} from "../types/mapper/annotationDataMapper.ts";
import type {MediaAsset, MediaLayout} from "../types/intern/media.ts";
import type {AnnotationData} from "../types/extern/annotationData.ts";

export function useEditorAnnotations(asset: MediaAsset | null, layout: MediaLayout | null) {
    const [annotations, setAnnotations] = useState<Annotation[]>([]);
    const [rawAnnotations, setRawAnnotations] = useState<AnnotationData[] | null>(null);

    // Fetch raw
    useEffect(() => {
        if (!asset?.id) return;

        fetchAnnotations(asset.id)
            .then(setRawAnnotations)
            .catch(e => console.error("Failed to fetch annotations", e));
    }, [asset?.id]);

    // Map raw → domain
    useEffect(() => {
        if (!rawAnnotations || !layout) return;

        const mapped = rawAnnotations
            .map((a) => {
                switch (a.type) {
                    case Constants.TEXT_TYPE_LABEL:
                        return getTextAnnotationFromAnnotationData(a, layout.width, layout.height);
                    case Constants.POLYLINE_TYPE_LABEL:
                        return getPolylineAnnotationFromAnnotationData(a, layout.width, layout.height);
                    default:
                        return null;
                }
            })
            .filter((a): a is Annotation => a !== null);

        setAnnotations(mapped);
    }, [rawAnnotations, layout]);

    function update(id: string, patch: AnnotationPatch) {
        setAnnotations(prev =>
            prev.map(a =>
                a.id === id
                    ? {
                        ...a,
                        ...patch,
                        style: patch.style ? { ...a.style, ...patch.style } : a.style,
                    }
                    : a
            )
        );
    }

    function remove(id: string) {
        setAnnotations(prev => prev.filter(a => a.id !== id));
    }

    function add(a: Annotation) {
        setAnnotations(prev => [...prev, a]);
    }

    function freezeCurrentVisibility(time: number) {
        setAnnotations(prev =>
            prev.map(a => {
                const visibleNow =
                    a.visibilityMode?.type === "force"
                        ? a.visibilityMode.value
                        : isAnnotationVisible(a, time);

                return {
                    ...a,
                    visibilityMode: { type: "force", value: visibleNow },
                };
            })
        );
    }


    function forceVisibility(id: string, visible: boolean) {
        setAnnotations(prev =>
            prev.map(a =>
                a.id === id
                    ? { ...a, visibilityMode: { type: 'force', value: visible } }
                    : a
            )
        );
    }

    function restoreAutoVisibility() {
        setAnnotations(prev =>
            prev.map(a => ({
                ...a,
                visibilityMode: { type: "auto" },
            }))
        );
    }

    // @ts-ignore
    function syncVisibilityOnTimeChange(time: number, isLocked: boolean) {
        if (isLocked) return;

        setAnnotations(prev => {
            let changed = false;

            const next = prev.map(a => {
                if (a.visibilityMode?.type === 'force') {
                    changed = true;
                    return {
                        ...a,
                        visibilityMode: { type: 'auto' as const },
                    };
                }
                return a;
            });

            return changed ? next : prev;
        });
    }

    async function save() {
        if (!asset || !layout) throw new Error("Missing asset or layout");

        return patchMediaAssetWithAnnotations(
            asset.id,
            toAnnotationDataArray(annotations, layout.width, layout.height)
        );
    }

    return {
        annotations,
        setAnnotations,
        add,
        remove,
        update,
        freezeCurrentVisibility,
        restoreAutoVisibility,
        forceVisibility,
        syncVisibilityOnTimeChange,
        save,
    };
}