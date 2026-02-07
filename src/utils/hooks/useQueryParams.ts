// useQueryParams.ts
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { runtimeConfig } from "../runtimeConfig";

type ParamConfig = {
    required?: boolean;
    demoDefault?: string;
};

export const useQueryParams = <T extends Record<string, ParamConfig>>(
    schema: T
): {
    params: Partial<Record<keyof T, string>>;
    ready: boolean;
    missingRequired: boolean;
} => {
    const [searchParams, setSearchParams] = useSearchParams();

    const currentParams = useMemo(() => {
        const result: Partial<Record<keyof T, string>> = {};

        for (const key in schema) {
            const value = searchParams.get(key);
            if (value) result[key] = value;
        }

        return result;
    }, [searchParams, schema]);

    useEffect(() => {
        let changed = false;
        const next = new URLSearchParams(searchParams);

        for (const key in schema) {
            const cfg = schema[key];
            const value = searchParams.get(key);

            if (!value && runtimeConfig.USE_MOCK_DATA && cfg.demoDefault) {
                next.set(key, cfg.demoDefault);
                changed = true;
            }
        }

        if (changed) {
            setSearchParams(next, { replace: true });
        }
    }, [searchParams, schema, setSearchParams]);

    const missingRequired = Object.entries(schema).some(
        ([key, cfg]) =>
            cfg.required &&
            !searchParams.get(key) &&
            !(runtimeConfig.USE_MOCK_DATA && cfg.demoDefault)
    );

    const ready =
        Object.keys(schema).every((key) => searchParams.has(key)) ||
        !runtimeConfig.USE_MOCK_DATA;

    return {
        params: currentParams,
        ready,
        missingRequired,
    };
};
