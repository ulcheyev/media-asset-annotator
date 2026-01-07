import type {MediaAssetState} from "./MediaAssetContext.types.ts";
import {createContext} from "react";

export const MediaAssetContext = createContext<MediaAssetState | null>(null);