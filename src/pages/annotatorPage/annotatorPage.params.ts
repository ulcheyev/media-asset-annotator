// annotatorPage.params.ts
import { runtimeConfig } from "../../utils/runtimeConfig";

export const annotatorPageParams = {
    id: {
        required: false,
    },
    url: {
        required: false,
        demoDefault: runtimeConfig.DEMO_MEDIA_URL,
    },
};
