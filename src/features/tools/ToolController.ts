import { Constants } from '../../utils/Constants';
import type { Annotation, PolylineAnnotation } from '../../types/intern/annotation';

export type Point = { x: number; y: number };

export type ToolControllerDeps = {
    createAnnotation: (a: Annotation) => void;
    updateAnnotation: (id: string, patch: Partial<Annotation>) => void;
    removeAnnotation: (id: string) => void;
    selectAnnotation: (id: string | null) => void;
    getCurrentTime: () => number;
};

type ToolSession = {
    tool: string;
    annotationId: string;
};

export class ToolController {
    private session: ToolSession | null = null;

    private deps: ToolControllerDeps;

    constructor(deps: ToolControllerDeps) {
        this.deps = deps;
    }

    /* ---------- lifecycle ---------- */

    onEditingDisabled() {
        this.cancelSession();
    }

    onToolChanged() {
        // commit current session
        this.commitSession();
    }

    /* ---------- pointer events ---------- */

    onPointerDown(tool: string, point: Point) {
        if (tool !== Constants.DRAW_TOOL_LABEL) return;
        console.log('onPointerDown', this.session);
        if (this.session) return;
        const id = crypto.randomUUID();

        const annotation: PolylineAnnotation = {
            id,
            kind: 'polyline',
            label: 'Polyline',
            points: [point.x, point.y],
            time: {
                start: this.deps.getCurrentTime(),
                end: this.deps.getCurrentTime(),
            },
            style: {
                color: Constants.POLYLINE_DEFAULT_COLOR,
                opacity: Constants.POLYLINE_DEFAULT_OPACITY,
                fill: Constants.POLYLINE_DEFAULT_FILL,
                strokeWidth: Constants.POLYLINE_DEFAULT_STROKE_WIDTH,
            },
        };

        this.deps.createAnnotation(annotation);


        this.session = {
            tool,
            annotationId: id,
        };
        console.log(this.session)
    }

    onPointerMove(point: Point) {
        if (!this.session) return;

        this.deps.updateAnnotation(this.session.annotationId, {
            points: (prev => [...prev, point.x, point.y]) as any,
        });
    }

    onPointerUp() {
        this.commitSession();
    }

    /* ---------- session handling ---------- */

    private commitSession() {
        console.log('commitSession before');
        console.log(this.session);
        if (!this.session) return;
        console.log('commitSession');

        this.deps.selectAnnotation(this.session.annotationId);
        this.session = null;
    }

    private cancelSession() {
        if (!this.session) return;

        this.deps.removeAnnotation(this.session.annotationId);
        this.session = null;
    }
}
